module.exports = (sequelize, Sequelize) => {
  const Information = sequelize.define("information", {
    cantidad: {
      type: Sequelize.INTEGER,
    },
    lote: {
      type: Sequelize.INTEGER,
    },
    kilos: {
      type: Sequelize.DECIMAL(10, 2),
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2),
    },
    importe: {
      type: Sequelize.DECIMAL(10, 2),
    },
    numAlbaran: {
      type: Sequelize.INTEGER,
      references: { model: "albaranes", key: "numAlbaran" },
    },
    productoId: {
      type: Sequelize.INTEGER,
      references: { model: "productos", key: "id" },
    },
  });
  return Information;
};
