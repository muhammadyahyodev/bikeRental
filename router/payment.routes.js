const Router = require("@koa/router");
const {
  addPayment,
  getPayment,
  getPayments,
  editPayment,
  deletePayment,
} = require("../controller/payment.controller");
const userPolice = require("../middlewares/userPolice");
const Validator = require("../middlewares/validator");
const router = new Router();

router.post("/add", Validator("payment"), addPayment);
router.get("/all", userPolice, getPayments);
router.get("/:id", userPolice, getPayment);
router.put("/:id", Validator("payment"), editPayment);
router.delete("/:id", userPolice, deletePayment);

module.exports = () => router.routes();
