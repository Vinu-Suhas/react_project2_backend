const brcypt = require("bcrypt");
const { response, request } = require("express");
const route = require("express").Router();
const jwt = require("jsonwebtoken");
const saltRound = 10;
const arr = [];
route.post("/register", (request, response) => {
  const data = request.body;
  const findAccount = arr.find((element) => element.email === data.email);
  if (findAccount) return response.send("Email already registered ");
  console.log("Data sent", request.body.password);
  data.password = brcypt.hashSync(data.password, saltRound);
  arr.push(data);
  const tokenData = jwt.sign({ name: data.mail }, "secretKey");
  //   const tokenData = jwt.sign(data.email, "secretKey");
  console.log(tokenData);
  response.send({ msg: "User has logged in successfully", token: tokenData });
});

route.post("/login", (request, response) => {
  const loginData = request.body;
  const accountData = arr.find((element) => loginData.email === element.email);
  if (!accountData)
    return response.send({ msg: "User has not registered, please try again" });
  const validatedAccount = brcypt.compareSync(
    loginData.password,
    accountData.password
  );
  if (validatedAccount) {
    const tokenData = jwt.sign({ name: loginData.email }, "secretKey");
    return response.send({ msg: "Account logged in", token: tokenData });
  } else
    return response.send({ msg: "Wrong Password .Please Check the password" });
});

module.exports = { route };
