const express = require("express");
const router = express.Router();
const Response = require("../services/Response");
const lodash = require("lodash");

/**
 * res.ok(200,  data)
 */
router.use((req, res, next) => {
  res.ok = (status, data, notification = {}) => {
    let showNull = req.query.showNull || false;
    removeNullableNestedObject(data, showNull, function (response) {
      let resp = new Response(status, response, null, notification);
      res.status(status)
      res.json(resp);
    });
  };
  res.error = (status, error, data = {}) => {
    if (typeof error == "object") {
      let response = new Response(status, data, error, {});
      response.getError((errorResp) => {
        res.status(status)
        res.json(errorResp);
        res.end();
      });
    }
  };
  next();
});
// exporting router
module.exports = router;
removeNullableNestedObject = function (params, showNull, callback) {
  try {
    params = pruneEmpty(params, showNull);
  } catch (ex) {
    console.error("Error when remove nullable nested objects: ", ex);
  }
  callback(params);
};
function pruneEmpty(obj, showNull) {
  return (function prune(current) {
    lodash.forOwn(current, function (value, key) {
      if (
        lodash.isUndefined(value) ||
        lodash.isNull(value) ||
        lodash.isNaN(value) ||
        (lodash.isString(value) && lodash.isEmpty(value)) ||
        (lodash.isObject(value) &&
          lodash.isEmpty(prune(value)) &&
          !lodash.isDate(value))
      ) {
        if (showNull) current[key] = "";
        if (showNull && lodash.isNumber(current[key]))
          return (current[key] = 0);
        if (showNull && lodash.isArray(value)) return (current[key] = []);
        delete current[key];
      }
    });
    if (lodash.isArray(current)) lodash.pull(current, undefined);
    return current;
  })(lodash.cloneDeep(obj));
}