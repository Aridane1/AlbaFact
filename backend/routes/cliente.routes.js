module.exports = (app) => {
  const factura = require("../controllers/cliente.controller");
  const router = require("express").Router();

  router.get("/one-client/:id", factura.getOneClient);
  router.get("/:userId", factura.getAllByUserId);
  router.post("/", factura.create);
  router.delete("/:id", factura.delete);
  router.put("/:id", factura.update);

  app.use("/api/cliente", router);
};
