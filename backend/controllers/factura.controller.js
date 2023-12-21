const db = require("../models");
const Factura = db.Factura;

exports.create = (req, res) => {
  let factura = req.body;
  Factura.create(factura)
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Error al crear la factura",
        });
      }
      res.send({ message: "Registro guardado", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor" });
    });
};
