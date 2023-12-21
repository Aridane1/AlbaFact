module.exports = (app) => {
  const factura = require("../controllers/factura.controller");
  const router = require("express").Router();

  router.post("/", factura.create);

  app.use("/api/factura", router);
};
