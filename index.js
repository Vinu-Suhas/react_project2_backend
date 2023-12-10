const express = require("express");
const app = express();

const { route } = require("./Authentication");
const { data } = require("./data");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
  response.send("success");
});
app.get("/data", (request, response) => {
  // console.log("test", newData);
  response.send(data);
});
app.use("/api", route);
app.listen(5000, () => {
  try {
    console.log("server started " + 5000);
  } catch (error) {
    console.log("Error:", error);
  }
});
