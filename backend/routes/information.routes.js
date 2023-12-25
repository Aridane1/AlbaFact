module.exports = (app) => {
  const information = require("../controllers/information.controller");
  const router = require("express").Router();

  router.post(
    "/many-information",
    information.getManyInformationByNumAlbaranAndYear
  );
  router.get("/:numAlbaran/:year", information.getAllByNumAlbaranAndYear);
  router.post("/many", information.createManyInformation);
  router.post("/one", information.createOneInformation);
  router.delete("/:id", information.deleteById);
  router.put("/update", information.update);

  app.use("/api/information", router);
};
