const db = require("../models");
const Producto = db.Producto;

exports.create = (req, res) => {
  let producto = { name: req.body.name };

  Producto.create(producto)
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Faild to create data" });
      res.send({ message: "El producto fue creado exitosamente", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.getAll = (req, res) => {
  Producto.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.deleteByName = (req, res) => {
  let producto = req.params.name;
  Producto.destroy({ where: { name: producto } })
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "No se ha eliminado el producto" });
      }
      res.send({ message: "Se elimino correctamente", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.update = (req, res) => {
  let producto = req.params.name;
  let updateProduct = { name: req.body.name };
  Producto.update(updateProduct, { where: { name: producto } })
    .then((data) => {
      if (!data[0]) {
        return res
          .status(404)
          .send({ message: "No se encontró el producto a actualizar" });
      }
      return res
        .status(200)
        .send({ message: "Actualización realizada con éxito" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.create = (req, res) => {
  let producto = { name: req.body.name };

  Producto.create(producto)
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Faild to create data" });
      res.send({ message: "El producto fue creado exitosamente", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error en el servidor." });
    });
};
