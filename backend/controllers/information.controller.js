const db = require("../models");
const Information = db.Information;
const Producto = db.Producto;

exports.createManyInformation = (req, res) => {
  let informations = req.body;
  c;
  if (!Array.isArray(informations)) {
    return res.status(400).send({
      message: "La solicitud debe contener una lista de informacion.",
    });
  }

  Promise.all(
    informations.map(async (information) => {
      if (!information.productoId) {
        await Producto.findOne({
          where: {
            name: information.producto,
          },
        })
          .then((data) => {
            if (!data || data.length === 0) {
              return res
                .status(404)
                .send({ message: "No se ha podido encontrar el producto" });
            }

            information.productoId = data.id;
            information.precio = data.price;
          })
          .catch((err) => {
            console.error("Error en la consulta:", err);
            return res.status(500).send({ message: "Error en el servidor." });
          });
      }

      if (!information.importe) {
        information.importe = information.kilos * information.precio;
      }
      information.importe = quitarComas(information.importe);
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

exports.createOneInformation = async (req, res) => {
  let information = req.body;
  if (!req.body.productoId) {
    console.log(information[0].producto);
    await Producto.findOne({
      where: {
        name: information[0].producto,
      },
    })
      .then((data) => {
        if (!data || data.length === 0) {
          return res
            .status(404)
            .send({ message: "No se ha podido encontrar el producto" });
        }
        information[0].productoId = data.id;
        information[0].precio = data.price;
      })
      .catch((err) => {
        console.error("Error en la consulta:", err);
        return res.status(500).send({ message: "Error en el servidor." });
      });
  }
  if (!information[0].importe) {
    information[0].importe = information[0].kilos * information[0].precio;
  }

  let info = {
    kilosC: information[0].kilosC,
    kilosP: information[0].kilosP,
    kilosB: information[0].kilosB,
    kilosN: information[0].kilosN,
    bulto: information[0].bulto,
    importe: information[0].importe,
    cantidad: information[0].cantidad,
    lote: information[0].lote,
    importe: quitarComas(information[0].importe),
    numAlbaran: information[0].numAlbaran,
    productoId: information[0].productoId,
    precio: information[0].precio,
    year: information[0].year,
  };
  Information.create(info)
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

exports.getAllByNumAlbaranAndYear = (req, res) => {
  Information.findAll({
    where: {
      numAlbaran: req.params.numAlbaran,
      year: req.params.year,
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

exports.getManyInformationByNumAlbaranAndYear = async (req, res) => {
  const albaranes = req.body;

  const dataPromises = albaranes.map(async (albaran) => {
    return Information.findAll({
      where: { numAlbaran: albaran.numAlbaran, year: albaran.year },
      raw: true,
    });
  });

  const results = await Promise.all(dataPromises);
  const info = [];
  for (const iterator of results) {
    for (const data of iterator) {
      info.push(data);
    }
  }

  res.send(info);
};

exports.deleteById = (req, res) => {
  const id = req.params.id;
  Information.destroy({ where: { id: id } })
    .then((num) => {
      if (num === 0) {
        return res.status(400).send({
          message: "No se ha podido eliminar la informacion.",
        });
      }
      return res.status(200).send({
        message: "Se ha eliminado la informacion",
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error interno del Servidor" });
    });
};

exports.update = (req, res) => {
  let informations = req.body;

  Promise.all(
    informations.map(async (information) => {
      if (!req.body.productoId) {
        console.log(information.producto);
        await Producto.findOne({
          where: {
            name: information.producto,
          },
        })
          .then((data) => {
            if (!data || data.length === 0) {
              return res
                .status(404)
                .send({ message: "No se ha podido encontrar el producto" });
            }
            information.productoId = data.id;
          })
          .catch((err) => {
            console.error("Error en la consulta:", err);
            return res.status(500).send({ message: "Error en el servidor." });
          });
      }

      if (!information.id) {
        let info = {
          kiloC: information.kiloC,
          kiloP: information.kiloP,
          kiloN: information.kiloN,
          kiloB: information.kiloB,
          bulto: information.bulto,
          importe: information.importe,
          cantidad: information.cantidad,
          lote: information.lote,
          importe: information.importe,
          numAlbaran: information.numAlbaran,
          productoId: information.productoId,
          precio: information.precio,
          year: information.year,
        };
        Information.create(info);
        return;
      }
      Information.update(information, { where: { id: information.id } });
    })
  )
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "Error actualizacion la informacion" });
      }
      return res.send({
        message: "Actualizacion de informacion realizados correctamente",
      });
    })
    .catch((err) => {
      console.error("err");
      return res.status(500).send({ message: "Error en el servidor." });
    });
};

function quitarComas(valorConComas) {
  const valorSinComas = valorConComas.replace(",", "");
  const valorNumerico = parseFloat(valorSinComas);

  return valorNumerico;
}
