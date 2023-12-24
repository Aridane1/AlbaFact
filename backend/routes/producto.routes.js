module.exports = (app) => {
  const producto = require("../controllers/producto.controller");
  const router = require("express").Router();

  router.get("/:id", producto.getOneProduct);
  router.get("/", producto.getAll);
  router.post("/", producto.create);
  router.delete("/:name", producto.deleteByName);
  router.put("/:id", producto.update);

  app.use("/api/productos", router);
};
