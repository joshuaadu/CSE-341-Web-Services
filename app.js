const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

module.exports = app;
