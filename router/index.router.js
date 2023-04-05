const Router = require("@koa/router");
const router = new Router();
const shopinfoRouter = require("../router/shopinfo.routes");
const rentalRouter = require("./rental.routes");
const clientRouter = require('./client.routes')
const userRouter = require("./user.routes")
const userGroupRouter = require("./user_group.routes")
const penaltyRouter = require("./penalty.routes")
const paymentRouter = require("./payment.routes")
const bikeInfoRouter = require("./bike_info.routes")
const bikeCategoryRouter = require("./bike_category.routes")
const adsManagementRouter = require("./ads_management.routes")
// const otpRouter = require('./otp.routes')

router.use("/bikerental/shopinfo", shopinfoRouter());
router.use("/bikerental/rental", rentalRouter());
router.use("/bikerental/client", clientRouter())
router.use("/bikerental/user/bosh", userRouter())
router.use("/bikerental/user_group", userGroupRouter())
router.use("/bikerental/penalty", penaltyRouter())
router.use("/bikerental/payment", paymentRouter())
router.use("/bikerental/bike_info", bikeInfoRouter())
router.use("/bikerental/bike_category", bikeCategoryRouter())
router.use("/bikerental/ads_management", adsManagementRouter())
// router.use('/bikerental/otp', otpRouter())

module.exports = router.routes();
