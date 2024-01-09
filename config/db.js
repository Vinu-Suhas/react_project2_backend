const { MongoClient } = require("mongodb");
require('dotenv').config();
// const mongourl = "mongodb://127.0.0.1:27017";
const serverURL=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce-project-vinu.ghdcicn.mongodb.net/?retryWrites=true&w=majority`



const mongoserver = new MongoClient(serverURL);
const connection = async () => {
  try {

    mongoserver.connect();
    console.log("connection to mongodb done successfully");
  } catch (err) {
    console.log("Error occured in mongodb", err);
  }
};
const userAuthenticationDataBase = mongoserver.db("ecommcerce");


module.exports = { connection, userAuthenticationDataBase };
