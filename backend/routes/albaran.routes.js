module.exports = (app) => {
  const albaran = require("../controllers/albaran.controller");
  const router = require("express").Router();

  router.get("/", albaran.getAll);
  router.get("/:numAlbaran", albaran.getAllAlbaranesByNumAlbaran);
  router.post("/", albaran.create);
  router.delete("/:id", albaran.delete);
  router.put("/:id", albaran.update);

  app.use("/api/albaranes", router);
};
