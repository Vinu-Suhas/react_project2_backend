const express = require("express");
const app = express();

const { data } = require("./data");
const cors = require("cors");
// const { connection } = require("mongoose");
const {  connection } = require("./config/db");
const { route } = require("./route/userRouter");
const { readData } = require("./controller/productController");


app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
  response.send("success");
});
app.get("/data",readData);
app.use("/api", route);

app.listen(5000, async () => {
  try {
    await connection();
    console.log("server started " + 5000);
    // await readData();
  } catch (error) {
    console.log("Error:", error);
  }
});
