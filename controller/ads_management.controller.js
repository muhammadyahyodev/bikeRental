const AdsManagement = require("../models/AdsManagement");

const addAdsManagement = async (ctx) => {
  try {
    // structure of AdsManagement model will be as below
    // id
    // ad_name;
    // shop_id;
    // banner_image;
    // description;
    // start_date;
    // end_date;
    // ad_location;
    // amount;
    // user_id;
    const newAdsManagement = await AdsManagement.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newAdsManagement.dataValues.ads_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
const getAdsManagements = async (ctx) => {
  try {
    const allAdsManagements = await AdsManagement.findAll();
    if (allAdsManagements.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allAdsManagements);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allAdsManagements };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAdsManagement = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const temp = await AdsManagement.findOne({
      where: { ads_id: id },
    });
    ctx.body = temp.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editAdsManagement = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await AdsManagement.update(ctx.request.body, {
      where: { ads_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteAdsManagement = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await AdsManagement.destroy({ where: { ads_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no AdsManagement found by this id" };
    }
    ctx.body = { message: "AdsManagement deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addAdsManagement,
  getAdsManagement,
  getAdsManagements,
  editAdsManagement,
  deleteAdsManagement,
};
