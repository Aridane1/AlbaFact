const db = require("../models");
const Albaran = db.Albaran;

exports.update = (req, res) => {
  let id = req.params.id;
  let albaran = req.body;

  Albaran.update(albaran, { where: { id: id } })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Albarán no encontrado",
        });
      }
      res.send({ message: "Registro actualizado" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor." });
    });
};
exports.delete = (req, res) => {
  let id = req.params.id;
  Albaran.destroy({ where: { id: id } })
    .then((data) => {
      if (!data) {
        return res.status(400).send({ message: "El albarán no existe" });
      }
      res.send({ message: "Se ha eliminado el albarán correctamente." });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor." });
    });
};
exports.getAll = (req, res) => {
  Albaran.findAll()
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "No data found" });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.getAllAlbaranesByNumAlbaran = (req, res) => {
  Albaran.findAll({
    where: { numAlbaran: req.params.numAlbaran },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "No data found" });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.create = (req, res) => {
  let albaran = req.body;
  if (!req.body.date) {
    albaran.date = Date.now();
  }

  Albaran.create(albaran)
    .then((data) => {
      if (!data) {
        return res.status(400).send({ message: "Error creando los albaranes" });
      }
      return res.send({
        message: "Registros de albaranes realizados correctamente",
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor." });
    });
};
