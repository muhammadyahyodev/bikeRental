const Router = require("@koa/router");
const {
  addToken,
  getToken,
  getTokens,
  editToken,
  deleteToken,
} = require("../controller/token.controller");
const userPolice = require("../middlewares/userPolice");
// const Validator = require("../middlewares/validator");
const router = new Router();

router.post("/add", userPolice, addToken);
router.get("/all", userPolice, getTokens);
router.get("/:id", userPolice, getToken);
router.put("/:id", userPolice, editToken);
router.delete("/:id", userPolice, deleteToken);

module.exports = () => router.routes();
