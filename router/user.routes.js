const Router = require("@koa/router");
const { getClients, getClient, editClient, deleteClient } = require("../controller/client.controller");
const {
  addUser,
  getUser,
  loginUser,
  getUsers,
  editUser,
  deleteUser,
  registrateUser,
  verifyUserOTP,
  logoutUser,
} = require("../controller/user.controller");
const userPolice = require("../middlewares/userPolice");
const Validator = require("../middlewares/validator");
const router = new Router();

router.post("bosh/add",userPolice, Validator("user"), addUser);
router.post("bosh/verify", verifyUserOTP);
router.post("bosh/registrate", Validator("user"), registrateUser);
router.post("bosh/login", loginUser);
router.post("bosh/logout",  logoutUser);
router.get("bosh/all",userPolice, getUsers);
router.get("bosh/:id",userPolice, getUser);
router.put("bosh/:id",userPolice, Validator("user"), editUser);
router.delete("bosh/:id",userPolice, deleteUser);
router.get("bosh/all", userPolice, getClients);
router.get("bosh/:id", userPolice, getClient);
router.put("bosh/:id", userPolice, Validator("client"), editClient);
router.delete("bosh/:id", userPolice, deleteClient);

module.exports = () => router.routes();
