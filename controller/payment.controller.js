const Payment = require("../models/Payment");

const addPayment = async (ctx) => {
  try {
    // structure of Payment model will be as below

    // payment_id;
    // rental_id;
    // payment_type;
    // pay_by;
    // payment_date;
    // remarks;
    // user_id;
    const newPayment = await Payment.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newPayment.dataValues.payment_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
const getPayments = async (ctx) => {
  try {
    const allPayments = await Payment.findAll();
    if (allPayments.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allPayments);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allPayments };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getPayment = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const payment = await Payment.findOne({ where: { payment_id: id } });
    ctx.body = payment.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editPayment = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await Payment.update(ctx.request.body, {
      where: { payment_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deletePayment = async (ctx) => {
  try {
    const id = ctx.request.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await Payment.destroy({ where: { payment_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no Payment found by this id" };
    }
    ctx.body = { message: "Payment deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addPayment,
  getPayment,
  getPayments,
  editPayment,
  deletePayment,
};
