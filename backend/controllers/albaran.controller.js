const db = require("../models");
const Albaran = db.Albaran;
const sequelize = db.sequelize;

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
  Albaran.findAll({ where: { userId: req.params.userId } })
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

exports.getAllAlbaranesByYearAndUser = (req, res) => {
  Albaran.findAll({
    where: { year: req.params.year, userId: req.params.userId },
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

exports.create = async (req, res) => {
  let albaran = req.body;
  if (!req.body.year) {
    await Albaran.findAll({
      where: { year: new Date().getFullYear(), userId: req.body.userId },
    })
      .then((albaranes) => {
        albaran.numAlbaran = albaranes.length + 1;
        const currentYear = new Date().getFullYear();
        albaran.year = currentYear;
      })
      .catch((error) => {
        console.error("Error al buscar elementos:", error);
      });
  }

  if (!req.body.date) {
    albaran.date = Date.now();
  } else {
    albaran.date = new Date(albaran.date);
  }
  Albaran.create(albaran)
    .then((data) => {
      if (!data) {
        return res.status(400).send({ message: "Error creando los albaranes" });
      }
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor." });
    });
};

exports.getAlbaranByNumAlbaranYear = (req, res) => {
  Albaran.findOne({
    where: {
      numAlbaran: req.params.numAlbaran,
      year: req.params.year,
      userId: req.params.userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "El elemento no existe" });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error en el servidor" });
    });
};

exports.getDistinctYear = async (req, res) => {
  try {
    const distinctYears = await Albaran.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("year")), "year"]],
      raw: true,
    });

    const years = distinctYears.map((item) => item.year);
    res.json(years);
  } catch (error) {
    console.error("Error al obtener los años desde la base de datos", error);
    res.status(500).send("Internal Server Error");
  }
};
