const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Import
const authRoute = require("./routes/authRouter");
const { bindUserWithRequest } = require("./middleware/authMiddleware");
const setLocals = require("./middleware/setLocals");
const { dashBoardGetController } = require("./controllers/dashboardController");

//  ejs setUp
app.set("view engine", "ejs");
app.set("views", "views");

//  mongodb url
const mongodb_Url =
  "mongodb+srv://shunnoIT_project1:cN8qroPsviiskJcy@cluster0.5rnuhbi.mongodb.net/shunnoIt_project";

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

// middleware connected
app.use(middleware);

// router connected
app.use("/auth", authRoute);
app.use(("/dashboard", dashBoardGetController));

store.on("error", function (error) {
  // Also get an error here
});

app.get("/", (req, res) => {
  res.send({
    message: "Server is ok",
  });
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
