const Penalty = require("../models/Penalty");

const addPenalty = async (ctx) => {
  try {
    // structure of Penalty model will be as below

    // Penalty_id;
    // rental_id;
    // Penalty_type;
    // pay_by;
    // Penalty_date;
    // remarks;
    // user_id;
    const newPenalty = await Penalty.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newPenalty.dataValues.penalty_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
const getPenalties = async (ctx) => {
  try {
    const allPenalties = await Penalty.findAll();
    if (allPenalties.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allPenalties);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allPenalties };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getPenalty = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const Penalty = await Penalty.findOne({ where: { penalty_id: id } });
    ctx.body = Penalty.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editPenalty = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await Penalty.update(ctx.request.body, {
      where: { penalty_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deletePenalty = async (ctx) => {
  try {
    const id = ctx.request.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await Penalty.destroy({ where: {penalty_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no Penalty found by this id" };
    }
    ctx.body = { message: "Penalty deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addPenalty,
  getPenalty,
  getPenalties,
  editPenalty,
  deletePenalty,
};
