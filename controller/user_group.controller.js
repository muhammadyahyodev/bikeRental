const UserGroup = require("../models/UserGroup");

const addUserGroup = async (ctx) => {
  try {
    // the structure of UserGroup model will be as below

    // group_name;
    // description;
    // allow_add;
    // allow_edit;
    // allow_delete;
    // allow_import;
    // allow_export;
    const newUserGroup = await UserGroup.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      message: "successfully added",
      id: newUserGroup.dataValues.group_id,
    };
  } catch (error) {
    console.log(error.message);
  }
};
const getUserGroups = async (ctx) => {
  try {
    const allUserGroups = await UserGroup.findAll();
    if (allUserGroups.length == 0) {
      ctx.body = { message: "no data available" };
      ctx.status = 400;
    } else {
      console.log(allUserGroups);
      ctx.status = 200;
      ctx.body = { message: "Found", data: allUserGroups };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getUserGroup = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const UserGroup = await UserGroup.findOne({ where: { group_id: id } });
    ctx.body = UserGroup.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};

const editUserGroup = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const editable = await UserGroup.update(ctx.request.body, {
      where: { UserGroup_id: id },
    });
    if (editable == 0) {
      ctx.body = { message: "no data found by this id" };
    }
    ctx.body = { message: "Updated" };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUserGroup = async (ctx) => {
  try {
    const id = ctx.request.params.id;
    if (!id) {
      ctx.body = { message: "id not entered" };
    }
    const deleting = await UserGroup.destroy({where: {group_id: id } });
    if (deleting == 0) {
      ctx.body = { message: "no UserGroup found by this id" };
    }
    ctx.body = { message: "UserGroup deleted", id };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addUserGroup,
  getUserGroup,
  getUserGroups,
  editUserGroup,
  deleteUserGroup,
};
