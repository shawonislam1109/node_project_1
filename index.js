const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

// Import router
const authRoute = require("./routes/authRouter");

//  ejs setUp
app.set("view engine", "ejs");
app.set("views", "views");

//  middleware
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];

// middleware connected
app.use(middleware);

// router connected
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Server is ok",
  });
});

const port = process.env.PORT || 9090;
// connect mongoose
mongoose
  .connect(
    "mongodb+srv://shunnoIT_project1:cN8qroPsviiskJcy@cluster0.5rnuhbi.mongodb.net/shunnoIt_project"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
