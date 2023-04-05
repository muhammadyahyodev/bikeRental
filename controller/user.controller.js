const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcryptjs = require("bcryptjs");
const Otp = require("../models/Otp");
const { decode, encode } = require("../services/otp.generator");
const jwt = require("../services/Jwt");
const config = require("config");
const Token = require("../models/Token");
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

// ================================================================================================//

const registrateUser = async (ctx) => {
  try {
    const {
      username,
      password,
      image,
      fullname,
      contact,
      email,
      user_category_id,
      status,
    } = ctx.request.body;
    let hashed = bcryptjs.hashSync(password);
    let image_path;
    if (ctx.request.body.image) {
      image_path = process.cwd() + "/images/users/" + ctx.request.body.image;
    }
    const newUser = await User.create({
      username,
      password: hashed,
      image: image_path,
      fullname,
      contact,
      email,
      user_category_id,
      status,
    });
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    const newotp = await Otp.create({
      otp_owner_id: newUser.dataValues.user_id,
      otp,
      expiration_time,
    });
    const details = {
      timestamp: now,
      check: contact,
      success: true,
      message: "NEW otp generated",
      otp_id: newotp.dataValues.id,
    };
    // console.log(details);
    const encoded = await encode(JSON.stringify(details));
    return (ctx.body = { status: "Success", details: encoded, newUser });
  } catch (error) {
    console.log(error.message);
  }
};
// =========================================================================//

const verifyUserOTP = async (ctx) => {
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
  let params = {
    id: obj.otp_id,
  };

  const otpResult = await Otp.findOne({ where: { id: params.id } });
  const result = otpResult;
  if (result != null) {
    if (result.verified != true) {
      if (dates.compare(result.expiration_time, currentdate) == 1) {
        if (otp == result.otp) {
          let params_verified = {
            id: result.id,
            verified: true,
          };
          await Otp.update(
            { verified: params_verified.verified },
            { where: { id: params_verified.id } }
          );
          const clientResult = await User.findOne({
            where: { contact: check },
          });
          // await pool.query(`UPDATE otps SET verified=$2 WHERE id=$1`, [params_verified.id, params_verified.verified])
          // const clientResult = await pool.query(`SELECT * FROM clients WHERE client_phone_number=$1`, [check])
          if (!clientResult) {
            const response = {
              status: "success",
              details: "new",
              check: check,
            };
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

const addUser = async (ctx) => {
  try {
    // the  structure of User model will be as below

    // username;
    // password;
    // image;
    // fullname;
    // contact;
    // email;
    // user_category_id;
    // status;
    const newUser = await User.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newUser.dataValues.user_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
//========================================================================================//

const loginUser = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      ctx.body = { message: "You are not registrated." };
    }
    let verify = bcryptjs.compareSync(password, user.password);
    if (!verify) {
      return (ctx.body = { message: "wrong email or password" });
    }
    let payload = {
      id: user.user_id,
      priviligue: user.user_category_id,
    };
    const tokens = jwt.generateTokens(payload);
    // user.token = tokens.refreshToken
    await Token.create({
      token_owner_id: user.user_id,
      token: tokens.refreshToken,
    });
    await user.save();
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_time"),
    });
    (ctx.status = 201), (ctx.body = { token: tokens });
  } catch (error) {
    console.log(error.message);
  }
};

//============================================================================================================//

const getUsers = async (ctx) => {
  try {
    const allUsers = await User.findAll();
    if (allUsers.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allUsers);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allUsers };
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ==============================================================================================//

const getUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const user = await User.findOne({ where: { user_id: id } });
    ctx.body = user.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

//= ======================================================================================//
const editUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await User.update(ctx.request.body, {
      where: { User_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (ctx) => {
  try {
    const id = ctx.request.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await User.destroy({ where: { user_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no User found by this id" };
    }
    ctx.body = { message: "User deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};
const logoutUser = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken")
    if(!refreshToken){
      return ctx.body = {status: 400, message:"You are already logged out" }
    }
    let token = await Token.findOne({where: {token: refreshToken}})
    if(!token){
      return ctx.body = {status: 400, message: "token not found"}
    }
    await Token.destroy({where: {id: token.id}})
    ctx.cookies.set("refreshToken", null)
    ctx.body = {status: 201, message: "See you again!"}
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  addUser,
  registrateUser,
  verifyUserOTP,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
};
