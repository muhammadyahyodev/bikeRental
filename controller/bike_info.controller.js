const BikeInfo = require("../models/Bike_info");

const addBikeInfo = async (ctx) => {
  try {
    // structure of Bike_info model will be as below

    // bike_category_id;
    // shop_id;
    // bike_name;
    // specsification;
    // rent_price;
    // availibility;
    // user_id;
    const newBikeInfo = await BikeInfo.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newBikeInfo.dataValues.bike_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
const getBikeInfos = async (ctx) => {
  try {
    const allBikeInfos = await BikeInfo.findAll();
    if (allBikeInfos.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allBikeInfos);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allBikeInfos };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getBikeInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const BikeInfo = await BikeInfo.findOne({ where: { bike_id: id } });
    ctx.body = BikeInfo.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editBikeInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await BikeInfo.update(ctx.request.body, {
      where: { bike_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBikeInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await BikeInfo.destroy({ where: { bike_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no BikeInfo found by this id" };
    }
    ctx.body = { message: "BikeInfo deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addBikeInfo,
  getBikeInfo,
  getBikeInfos,
  editBikeInfo,
  deleteBikeInfo,
};
