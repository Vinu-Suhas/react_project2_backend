const route = require("express").Router();
const { paymentGatewall } = require("../controller/paymentController");
const { register, login } = require("../controller/userController");

route.post("/register", register);
route.post("/login", login);
route.post("/checkout",paymentGatewall)

module.exports = { route };
