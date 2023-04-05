const Rental = require("../models/Rental");

const addRental = async (ctx) => {
  try {
    const {
      // the sturcture of Rental model will be as below
      bike_id,
      client_id,
      // rental_start_date,
      // rental_end_date,
      total_amaount,
      payment_status,
      rental_status,
      remarks,
      user_id,
    } = ctx.request.body;
    const newRental = await Rental.create({
      bike_id,
      client_id,
      total_amaount,
      payment_status,
      rental_status,
      remarks,
      user_id,
    });
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newRental.dataValues.rental_id,
    };
  } catch (error) {
    console.log(error.message);
    
  }
};
const getRentals = async (ctx) => {
  try {
    const allrentals = await Rental.findAll();
    if (allrentals.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allrentals);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allrentals };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getRental = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const rent = await Rental.findOne({ where: { rental_id: id } });
    ctx.body = rent.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editRental = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await Rental.update(ctx.request.body, {
      where: { rental_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteRental = async (ctx) => {
  try {
    const id = ctx.request.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await Rental.destroy({ where: { rental_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no Rental found by this id" };
    }
    ctx.body = { message: "Rental deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addRental,
  getRental,
  getRentals,
  editRental,
  deleteRental,
};
