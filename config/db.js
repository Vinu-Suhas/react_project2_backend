const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
const mongourl = "mongodb://127.0.0.1:27017";

//mongoserver.connect()
const mongoserver = new MongoClient(mongourl);
const connection = async () => {
  try {
    // await mongoose.connect(mongourl);
    mongoserver.connect(mongourl);
    console.log("connection to mongodb done successfully");
  } catch (err) {
    console.log("Error occured in mongodb", err);
  }
};
const userAuthenticationDataBase = mongoserver.db("ecommcerce");

const readData = async () => {
  try {
    console.log("read data started");
    const productscollection =
      userAuthenticationDataBase.collection("products");
    console.log("collection started");

    const result = await productscollection.find({}).toArray();
    // await productscollection.insertOne({
    //   id: 20,
    //   name: "APPLE 2022 Macbook Air",
    //   imageLink:
    //     "https://rukminim2.flixcart.com/image/832/832/kp5sya80/screen-guard/tempered-glass/o/v/n/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3.jpeg?q=70",
    //   storage: "1000GB",
    //   brand: "Apple",
    //   price: "62390",
    //   category: "laptop",
    //   rating: "3.2",
    // });

    // );
    // const collection = userAuthenticationDataBase.collection("products");

    // Example: Find all documents in the collection
    // const result = await collection.find({}).toArray();

    console.log("Query result:", result);
    console.log("inserted");
  } catch (err) {
    console.log("Error occurred while reading data from MongoDB", err);
  }
};

module.exports = { connection, userAuthenticationDataBase, readData };
