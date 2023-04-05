const Router = require("@koa/router");
const {
  addPenalty,
  getPenalty,
  getPenalties,
  editPenalty,
  deletePenalty,
} = require("../controller/penalty.controller");
const userPolice = require("../middlewares/userPolice");
const Validator = require('../middlewares/validator')
const router = new Router();

router.post("/add",userPolice, Validator("penalty"), addPenalty);
router.get("/all", userPolice, getPenalties);
router.get("/:id", userPolice, getPenalty);
router.put("/:id",userPolice, Validator("penalty"), editPenalty);
router.delete("/:id",userPolice, deletePenalty);

module.exports = () => router.routes();
