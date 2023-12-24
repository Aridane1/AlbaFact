module.exports = (app) => {
  const albaran = require("../controllers/albaran.controller");
  const router = require("express").Router();

  router.get("/years", albaran.getDistinctYear);
  router.get("/:numAlbaran/:year", albaran.getAlbaranByNumAlbaranAndYear);
  router.get("/", albaran.getAll);
  router.get("/:year", albaran.getAllAlbaranesByYear);
  router.post("/", albaran.create);
  router.delete("/:id", albaran.delete);
  router.put("/:id", albaran.update);

  app.use("/api/albaranes", router);
};
