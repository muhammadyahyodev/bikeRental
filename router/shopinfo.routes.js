const Router = require("@koa/router");
const {
  addShopinfo,
  getShopinfo,
  getShopinfos,
  editShopinfo,
  deleteShopinfo,
} = require("../controller/shopinfo.controller");
const userPolice = require("../middlewares/userPolice");
const Validator = require("../middlewares/validator");
const router = new Router();

router.post("/add", userPolice, Validator("shopinfo"), addShopinfo);
router.get("/all", userPolice, getShopinfos);
router.get("/:id", userPolice, getShopinfo);
router.put("/:id", userPolice, Validator("shopinfo"), editShopinfo);
router.delete("/:id", userPolice, deleteShopinfo);

module.exports = () => router.routes();
