const db = require("../models");
const Information = db.Information;

exports.createManyInformation = (req, res) => {
  let informations = req.body;

  if (!Array.isArray(informations)) {
    return res.status(400).send({
      message: "La solicitud debe contener una lista de informacion.",
    });
  }

  Promise.all(
    informations.map((information) => {
      if (!information.importe) {
        information.importe = information.kilos * information.precio;
      }
      Information.create(information);
    })
  )
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "Error creando la informacion" });
      }
      return res.send({
        message: "Registros de informacion realizados correctamente",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error en el servidor." });
    });
};
exports.createOneInformation = (req, res) => {
  let information = req.body;

  if (!req.body.importe) {
    information.importe = information.kilos * information.precio;
  }

  Information.create(information)
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "Error creando la informacion" });
      }
      return res.send({
        message: "Registros de informacion realizados correctamente",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.getAllByNumAlbaran = (req, res) => {
  Information.findAll({
    where: {
      numAlbaran: req.params.numAlbaran,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "No hay informacion asociada a ese albaran" });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res
        .status(500)
        .send("ERROR AL OBTENER LA INFORMACION DEL ALBARAN");
    });
};

exports.deleteByNumAlbaran = (req, res) => {
  const numAlbaran = req.params.numAlbaran;
  Information.destroy({ where: { numAlbaran: numAlbaran } })
    .then((num) => {
      if (num === 0) {
        return res.status(400).send({
          message:
            "NO SE HA ELIMINADO NINGUNA INFORMACIÓN ASOCIADA A ESE ALBARÁN.",
        });
      }
      return res.status(200).send({
        message: "Se ha eliminado la informacion relacionada con este Albaran",
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error interno del Servidor" });
    });
};

exports.update = (req, res) => {
  let id = req.params.id;
  Information.update(req.body, { where: { id: id } })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "No se ha podido actualizar el registro" });
      }
      res.status(200).send("Se a añadido correctamente");
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error Interno" });
    });
};
