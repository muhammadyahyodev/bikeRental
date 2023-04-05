const Router = require("@koa/router");
const {
  addAdsManagement,
  getAdsManagement,
  getAdsManagements,
  editAdsManagement,
  deleteAdsManagement,
} = require("../controller/ads_management.controller");
const Validate = require('../middlewares/validator')
const router = new Router();

router.post("/add",Validate("ads"), addAdsManagement);
router.get("/all", getAdsManagements);
router.get("/:id", getAdsManagement);
router.put("/:id", Validate("ads"), editAdsManagement);
router.delete("/:id", deleteAdsManagement);

module.exports = () => router.routes();
