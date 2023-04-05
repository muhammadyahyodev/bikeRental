const Router = require("@koa/router");
const {
  addUserGroup,
  getUserGroup,
  getUserGroups,
  editUserGroup,
  deleteUserGroup,
} = require("../controller/user_group.controller");
const userPolice = require("../middlewares/userPolice");
const Validator = require("../middlewares/validator");
const router = new Router();

router.post("/add", userPolice, Validator("user_group"), addUserGroup);
router.get("/all", userPolice, getUserGroups);
router.get("/:id", userPolice, getUserGroup);
router.put("/:id", userPolice, Validator("user_group"), editUserGroup);
router.delete("/:id", userPolice, deleteUserGroup);

module.exports = () => router.routes();
