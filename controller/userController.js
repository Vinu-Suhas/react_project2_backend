const brcypt = require("bcrypt");
const saltRound = 10;
const { userAuthenticationDataBase } = require("../config/db");
const userDatabase = userAuthenticationDataBase.collection("users");
const jwt = require("jsonwebtoken");
const arr = [];

const register = async (request, response) => {
  const data = request.body;
  console.log("Data sent", request.body);
  const findAccount = await userDatabase.findOne({ email: data.email });
  if (findAccount) return response.send("Email already registered ");

  data.password = brcypt.hashSync(data.password, saltRound);
  arr.push(data);
  await userDatabase.insertOne(data);
  // const tokenData = jwt.sign({ name: data.mail }, "secretKey");
  //   const tokenData = jwt.sign(data.email, "secretKey");
  // console.log(tokenData);
  response.send({ msg: "User has Registed in successfully" });
};

const login = async (request, response, next) => {
  const loginData = request.body;
  console.log({ email: loginData.email });
  const accountData = await userDatabase.findOne({ email: loginData.email });
  console.log(accountData);
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
};
module.exports = { register, login };
