module.exports = (app) => {
  const albaran = require("../controllers/albaran.controller");
  const router = require("express").Router();

  router.get("/albaranUser/:userId", albaran.getAll);
  router.get("/years", albaran.getDistinctYear);
  router.get("/:numAlbaran/:year/:userId", albaran.getAlbaranByNumAlbaranYear);
  router.get("/:year/:userId", albaran.getAllAlbaranesByYearAndUser);
  router.post("/", albaran.create);
  router.delete("/:id", albaran.delete);
  router.put("/:id", albaran.update);

  app.use("/api/albaranes", router);
};
