const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const morgan = require("morgan");

// import middleware
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");

let DB_USERNAME = process.env.USER_NAME;
let DB_PASSWORD = process.env.USER_PASSWORD;

//  mongodb url
const mongodb_Url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.5rnuhbi.mongodb.net/shunnoIt_project`;

// store session in mongodb
const store = new MongoDBStore({
  uri: mongodb_Url,
  collection: "mySessions",
  expires: 1000 * 60 * 60 * 2,
});

//  middleware
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
];

module.exports = (app) => {
  app.use(middleware);
};
