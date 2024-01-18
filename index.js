const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// import
const setRouters = require("./routes/mainRoutes");
const setMiddleware = require("./middleware/combineMiddleware");

//  ejs setUp
// app.set("view engine", "ejs");
// app.set("views", "views");

let DB_USERNAME = process.env.USER_NAME;
let DB_PASSWORD = process.env.USER_PASSWORD;

// console.log(config.get("db_username"));

//  mongodb url
const mongodb_Url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.5rnuhbi.mongodb.net/shunnoIt_project`;

// Usings middleware from middleware directory
setMiddleware(app);

// Usings route from route directory
setRouters(app);

// 404 page handler

// app.use((req, res, next) => {
//   let error = new Error("404");
//   error.status = 400;
//   next(error);
// });

app.use((error, req, res, next) => {
  if (error.status == 400) {
    return res.json({ message: "400 page not found" });
  } else {
    return res.json({ message: error.message });
  }
  // next();
});

const port = process.env.PORT || 9090;
// connect mongoose
mongoose
  .connect(mongodb_Url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
