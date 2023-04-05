const Router = require("@koa/router");
const {
  addBikeInfo,
  getBikeInfo,
  getBikeInfos,
  editBikeInfo,
  deleteBikeInfo,
} = require("../controller/bike_info.controller");
const Validator = require("../middlewares/validator");
const clientPolice = require("../middlewares/clientPolice");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router.post("/add", userPolice, Validator("bike_info"), addBikeInfo);
router.get("/all", userPolice, clientPolice, getBikeInfos);
router.get("/:id", userPolice, clientPolice, getBikeInfo);
router.put("/:id", userPolice, Validator("bike_info"), editBikeInfo);
router.delete("/:id", userPolice, deleteBikeInfo);

module.exports = () => router.routes();
