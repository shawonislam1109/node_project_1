const authRouter = require("./authRouter");
const dashBoardRouter = require("./dashboardRoute");
const fileUploadRoute = require("./fileUploadRoute");
const postRoute = require("./postRoute");
const apiRoute = require("./apiRoute");

const routes = [
  {
    path: "/auth",
    handler: authRouter,
  },
  {
    path: "/dashboard",
    handler: dashBoardRouter,
  },
  {
    path: "/post",
    handler: postRoute,
  },
  {
    path: "/api",
    handler: apiRoute,
  },
  {
    path: "/file",
    handler: fileUploadRoute,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.send({
        message: "Server is running",
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
