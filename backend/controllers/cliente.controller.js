const db = require("../models");
const Cliente = db.Cliente;

exports.create = (req, res) => {
  let cliente = req.body;
  console.log(cliente);
  Cliente.create(cliente)
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Error al crear el cliente",
        });
      }
      res.send({ message: "Registro guardado", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor" });
    });
};

exports.delete = (req, res) => {
  let id = req.params.id;
  Cliente.destroy({ where: { id: id } })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "No se ha eliminado el cliente" });
      }
      res.send({ message: "Se elimino correctamente", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.getAllByUserId = (req, res) => {
  Cliente.findAll({ where: { userId: req.params.userId } })
    .then((data) => {
      if (!data) {
        return res.status(400).send({ message: "No hay registros" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};
exports.getOneClient = (req, res) => {
  Cliente.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        return res.status(400).send({ message: "No hay registro" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.update = (req, res) => {
  let cliente = req.body;
  let id = req.params.id;
  Cliente.update(cliente, { where: { id: id } })
    .then((data) => {
      if (!data[0]) {
        return res
          .status(404)
          .send({ message: "No se encontró el cliente a actualizar" });
      }
      return res
        .status(200)
        .send({ message: "Actualización realizada con éxito" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};
