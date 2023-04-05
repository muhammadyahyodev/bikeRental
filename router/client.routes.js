const Router = require("@koa/router");
const {
  registClient,
  loginClient,
  getClient,
  getClients,
  editClient,
  deleteClient,
  verifyClientOTP,
  logoutClient,
  givingOtp,
} = require("../controller/client.controller");
const Validator = require("../middlewares/validator");
const clientPolice = require("../middlewares/clientPolice");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router.post("/add", userPolice, Validator("client"), registClient);
router.post("/login", loginClient);
router.post("/give-otp",Validator("give_otp"), givingOtp);
router.post("/registrate", registClient);
router.post("/verify", verifyClientOTP);
router.get("/all", clientPolice, getClients);
router.get("/:id", clientPolice, getClient);
router.put("/:id", Validator("client"), editClient);
router.delete("/:id", userPolice, deleteClient);
router.post("/logout", logoutClient);

module.exports = () => router.routes();
