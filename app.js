const Koa = require("koa");
const app = new Koa();
const config = require("config");
const PORT = config.get("port") || 5000;
const bparser = require("koa-bodyparser");
// const kstatic = require("koa-static");
const cors = require("@koa/cors");
const sequelize = require("./config/db");
// const ApiError = require('./services/Reply-for-Errors')
const router = require("./router/index.router");

// app.use(kstatic(__dirname + "/public"));
app.use(bparser());
app.use(cors());
app.use(router);

// app.use(ApiError)
const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("connction failed");
  }
};
run();
