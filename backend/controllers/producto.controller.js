const db = require("../models");
const Producto = db.Producto;

exports.create = (req, res) => {
  let producto = req.body;
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

exports.getAllProductByUserId = (req, res) => {
  Producto.findAll({ where: { userId: req.params.userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.getOneProduct = (req, res) => {
  Producto.findOne({ where: { id: req.params.id } })
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
  let id = req.params.id;
  let updateProduct = { name: req.body.name, price: req.body.price };
  Producto.update(updateProduct, { where: { id: id } })
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
