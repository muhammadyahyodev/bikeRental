const shopinfo = require("../models/Shopinfo");

const addShopinfo = async (ctx) => {
  try {
    const {
      // the structure of Shopinfo model will be as below
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    } = ctx.request.body;
    const newshopinfo = await shopinfo.create({shop_name,
        owner_name,
        address,
        email_address,
        contact_no,
        website,
        updated_by,})
    ctx.status = 201
    ctx.body = {message: "successfully added", id: newshopinfo.dataValues.id}
  } catch (error) {
    console.log(error.message);
  }
};
const getShopinfos = async (ctx) => {
  try {
    const allshops = await shopinfo.findAll()
    if(allshops.length == 0){
        ctx.body = {message: "no data available"}
        ctx.status = 400
    }else{
        ctx.status = 200
        ctx.body = {message: "Found", allshops }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getShopinfo = async (ctx) => {
  try {
    const id = ctx.request.params.id
    if(!id) {
      ctx.body = {message: "id not entered"}
    }const takenshop = await shopinfo.findOne({where: {id}})
    console.log(takenshop.dataValues);
    ctx.body = takenshop.dataValues
  } catch (error) {
    console.log(error.message);
  }
};

const editShopinfo = async (ctx) => {
  try {
    const id = ctx.request.params.id
    if(!id) {
      ctx.body = {message: "id not entered"}
    }const {
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    } = ctx.request.body
    const editable = await shopinfo.update({
      shop_name: shop_name, 
      owner_name:owner_name,
      address:address,
      email_address: email_address,
      contact_no: contact_no,
      website:website,
      updated_by:updated_by},
      {where: {id: id}})
      if(editable == 0){
        ctx.body = {message: "no data found by this id"}
      }
      ctx.body = {message: "Updated"} 
  } catch (error) {
    console.log(error.message );
  }

};

const deleteShopinfo = async (ctx) => {
  try {
    const id = ctx.request.params.id
    if(!id) {
      ctx.body = {message: "id not entered"}
    }
    const deleting = await shopinfo.destroy({where: {id}})
    if(deleting == 0){
      ctx.body = {message: "no shopinfo found by this id"}
    }
    ctx.body = {message: "shopinfo deleted", id}
  } catch (error) {
    console.log(error.message);

  }
};

module.exports = {
  addShopinfo,
  getShopinfo,
  getShopinfos,
  editShopinfo,
  deleteShopinfo,
};
