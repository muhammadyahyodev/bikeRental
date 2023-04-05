const Client = require("../models/Client");
const otpGenerator = require("otp-generator");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const Otp = require("../models/Otp");
const { decode, encode } = require("../services/otp.generator");
const jwt = require("../services/Jwt");
const config = require("config");
const Token = require("../models/Token");
const ApiError = require('../services/Reply-for-Errors')
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const givingOtp = async(ctx) => {
  try {
    const {contact_number} = ctx.request.body
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    const newotp = await Otp.create({
      otp,
      expiration_time,
    });
    const details = {
      timestamp: now,
      check: contact_number,
      success: true,
      message: "NEW otp generated",
      otp_id: newotp.dataValues.id,
    };
    const encoded = await encode(JSON.stringify(details));
    return (ctx.body = { status: "Success", details: encoded,});
  } catch (error) {
    console.log(error);
  }
}
const registClient = async (ctx) => {
  try {
    const {
      // structure of Client model will be as below
      image,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password,
      status,
    } = ctx.request.body;
    const verification_key = ctx.cookies.get("verificationKey")
    ctx.cookies.set("refreshToken", null)
    let hashed = bcryptjs.hashSync(password);
    let image_path;
    if (ctx.request.body.image) {
      image_path = process.cwd() + "/images/clients/" + ctx.request.body.image;
    }
    let decoded = await decode(verification_key);
    let obj = JSON.parse(decoded);
    
    const client = await Client.create({
      otp_id: obj.otp_id,
      image: image_path,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password: hashed,
      status,
    });
    let payload = {
      id: client.client_id,
        date: new Date(),
      };
      const tokens = jwt.generateTokens(payload);
      await Token.create({
        token_owner_id: client.client_id,
        token: tokens.refreshToken,
      });
  
      await client.save();
      ctx.cookies.set("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: config.get("cookie_time"),
      });
      (ctx.status = 201), (ctx.body = { token: tokens });

  } catch (error) {
    console.log(error.message);
  }
};
const verifyClientOTP = async (ctx) => {
  const { verification_key, otp, check } = ctx.request.body;
  let currentdate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (error) {
    const response = { status: "fail", details: "bad request" };
    return (ctx.body = { status: 400, response });
  }
  let obj = JSON.parse(decoded);
  const check_obj = obj.check;
  if (!check) {
    const response = {
      status: "fail",
      message: "contact number not entered",
    };
    return (ctx.body = { status: 400, response });
  }
  if (check_obj != check) {
    const response = {
      status: "fail",
      details: "OTP was not send recieved phone number",
    };
    return (ctx.body = { status: 400, response });
  }
  const otpResult = await Otp.findOne({ where: { id: obj.otp_id} });
  console.log(otpResult);
  if (otpResult != null) {
    if (otpResult.verified != true) {
      if (dates.compare(otpResult.expiration_time, currentdate) == 1) {
        if (otp == otpResult.otp) {
          await Otp.update({ verified: true },{ where: { id: otpResult.id}});
          const clientResult = await Client.findOne({where: {contact_number: check}});
          if (!clientResult) {
            const response = {
              status: "success",
              details: "new",
              check: check,
              url: `http://localhost:${config.get("port")}/bikerental/client/registrate`
            };
            ctx.cookies.set("verificationKey", verification_key, {
              httpOnly: true,
              maxAge: config.get("cookie_time"),
            });
            return (ctx.body = { status: 200, response });
          } else {
            const response = {
              Status: "success",
              Details: "old",
              check: check,
              clientName: clientResult.dataValues.username,
            };
            return (ctx.body = { status: 200, response });
          }
        } else {
          const response = { Status: "fail", Details: "otp not matched" };
          return (ctx.body = { status: 400, response });
        }
      } else {
        const response = { Status: "fail", Details: "otp expired" };
        return (ctx.body = { status: 400, response });
      }
    } else {
      const response = { Status: "fail", Details: "otp already used" };
      return (ctx.body = { status: 400, response });
    }
  } else {
    const response = { Status: "failure", Details: "bad request" };
    return (ctx.body = { status: 400, response });
  }
};

const loginClient = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const client = await Client.findOne({ where: { email_address: email } });
    let verify = bcryptjs.compareSync(password, client.password);
    if (!verify) {
      ctx.body = { message: "wrong email or password" };
    }
    let payload = {
    id: client.client_id,
      date: new Date(),
    };
    const tokens = jwt.generateTokens(payload);
    await Token.create({
      token_owner_id: client.client_id,
      token: tokens.refreshToken,
    });

    await client.save();
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_time"),
    });
    (ctx.status = 201), (ctx.body = { token: tokens });
  } catch (error) {
    console.log(error.message);
  }
};

const getClients = async (ctx) => {
  try {
    const allClients = await Client.findAll();
    if (allClients.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allClients);
      ctx.status = 200;
      ctx.body = { message: "Found", allClients };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const client = await Client.findOne({ where: { client_id: id } });
    ctx.body = client.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await Client.update(ctx.request.body, {
      where: { client_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await Client.destroy({ where: { client_id: id } });

    console.log(deleting);
    if (deleting == 0) {
      return (ctx.body = { message: "no Client found by this id" });
    }
    ctx.body = { message: "Client deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

const logoutClient = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken")
    if(!refreshToken){
      return ctx.body = {status: 400, message:"You are already logged out" }
    }
    let token = await Token.findOne({where: {token: refreshToken}})
    if(!token){
      return ctx.body = {status: 400, message: "token not found"}
    }
    await Otp.destroy({where: {otp_owner_id: token.token_owner_id}})
    await Token.destroy({where: {id: token.id}})
    ctx.cookies.set("refreshToken", null)
    ctx.body = {status: 201, message: "See you again!"}

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registClient,
  givingOtp,
  loginClient,
  logoutClient,
  verifyClientOTP,
  getClient,
  getClients,
  editClient,
  deleteClient,
};
