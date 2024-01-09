const brcypt = require("bcrypt");
const { userAuthenticationDataBase } = require("../config/db");
const userDatabase = userAuthenticationDataBase.collection("users");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (request, response) => {
  const data = request.body;
  const findAccount = await userDatabase.findOne({ email: data.email });
  if (findAccount) return response.send({msg:"Email already registered "});
  data.password = brcypt.hashSync(data.password, parseInt(process.env.BCRYPT_SALT_ROUND));
  await userDatabase.insertOne(data);
  response.send({ msg: "User has Registed in successfully" });
};

const login = async (request, response, next) => {
  const loginData = request.body;
  const accountData = await userDatabase.findOne({ email: loginData.email });
  if (!accountData)
    return response.send({ msg: "User has not registered, please try again" });
  const validatedAccount = brcypt.compareSync(
    loginData.password,
    accountData.password
  );
  if (validatedAccount) {
    const tokenData = jwt.sign({ name: loginData.email }, process.env.JWT_SECRET);
    return response.send({ msg: "Account logged in", token: tokenData });
  } else
    return response.send({ msg: "Wrong Password .Please Check the password" });
};
module.exports = { register, login };
