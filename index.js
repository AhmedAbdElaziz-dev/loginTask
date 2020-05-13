const express = require("express");

require("./db");
require("dotenv").config();
const app = express();
const port =  process.env.PORT || 3001;
require('express-async-errors');
const userRoute = require("./routes/user");

const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute);


app.use((req, res, next) => {
  console.log({
    "request url": req.url,
    body: req.header,
    method: req.method,
    "requst time": new Date(),
  });
});

app.use((err, req, res, next) => {
  const statusCode = req.statusCode || 500;
  if (statusCode >= 500) {
    res.status(statusCode).json({
      message: "SomeThing Went Wrong!",
      type: "INTERNAL_SERVER_ERROR !",
      detail: [],
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
      type: err.type,
      detail: [err.detail],
    });
  }
});
app.listen(port, () => {
  console.log("server is running");
});
