module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const router = require("express").Router();
  const auth = require("../controllers/auth");

  router.post("/", user.create);
  router.delete("/", user.delete);
  router.post("/singin", auth.signin);

  app.use("/api/user", router);
};
