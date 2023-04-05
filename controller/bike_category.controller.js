const BikeCategory = require("../models/Bike_category");

const addBikeCategory = async (ctx) => {
  try {
    // structure of BikeCAtegory model will as below

    // id
    // category_name;
    // description;
    const newBikeCategory = await BikeCategory.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newBikeCategory.dataValues.category_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
const getBikeCategorys = async (ctx) => {
  try {
    const allBikeCategoreis = await BikeCategory.findAll();
    if (allBikeCategoreis.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allBikeCategoreis);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allBikeCategoreis };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getBikeCategory = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const bcategory = await BikeCategory.findOne({
      where: { category_id: id },
    });
    ctx.body = bcategory.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editBikeCategory = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await BikeCategory.update(ctx.request.body, {
      where: { category_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBikeCategory = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await BikeCategory.destroy({ where: { category_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no BikeCategory found by this id" };
    }
    ctx.body = { message: "BikeCategory deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addBikeCategory,
  getBikeCategory,
  getBikeCategorys,
  editBikeCategory,
  deleteBikeCategory,
};
