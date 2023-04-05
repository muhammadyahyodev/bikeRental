const Router = require("@koa/router");
const {
  addRental,
  getRental,
  getRentals,
  editRental,
  deleteRental,
} = require("../controller/rental.controller");
const clientPolice = require("../middlewares/clientPolice");
const userPolice = require("../middlewares/userPolice");
const Validator = require("../middlewares/validator");
const router = new Router();

router.post("/add", Validator("rental"), addRental);
router.get("/all", userPolice, clientPolice, getRentals);
router.get("/:id", userPolice, clientPolice, getRental);
router.put("/:id", Validator("rental"), editRental);
router.delete("/:id", deleteRental);

module.exports = () => router.routes();
