module.exports = (app) => {
  const information = require("../controllers/information.controller");
  const router = require("express").Router();

  router.get("/:numAlbaran", information.getAllByNumAlbaran);
  router.post("/many", information.createManyInformation);
  router.post("/one", information.createOneInformation);
  router.delete("/:numAlbaran", information.deleteByNumAlbaran);
  router.put("/:id", information.update);

  app.use("/api/information", router);
};
