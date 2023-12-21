module.exports = (app) => {
  const producto = require("../controllers/producto.controller");
  const router = require("express").Router();

  router.get("/", producto.getAll);
  router.post("/", producto.create);
  router.delete("/:name", producto.deleteByName);
  router.put("/:name", producto.update);

  app.use("/api/productos", router);
};
