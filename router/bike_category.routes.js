const Router = require("@koa/router");
const {
  addBikeCategory,
  getBikeCategory,
  getBikeCategorys,
  editBikeCategory,
  deleteBikeCategory,
} = require("../controller/bike_category.controller");
const userPolice = require("../middlewares/userPolice");
const Validator = require("../middlewares/validator");
const router = new Router();

router.post("/add", userPolice, Validator("bike_category"), addBikeCategory);
router.get("/all", userPolice, getBikeCategorys);
router.get("/:id", userPolice, getBikeCategory);
router.put("/:id", userPolice, Validator("bike_category"), editBikeCategory);
router.delete("/:id", userPolice, deleteBikeCategory);

module.exports = () => router.routes();
