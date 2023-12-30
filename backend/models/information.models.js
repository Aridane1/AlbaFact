module.exports = (sequelize, Sequelize) => {
  const Information = sequelize.define("information", {
    cantidad: {
      type: Sequelize.INTEGER,
    },
    bulto: {
      type: Sequelize.INTEGER,
    },
    lote: {
      type: Sequelize.INTEGER,
    },
    kilosB: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    kilosC: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    kilosN: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    kilosP: {
      type: Sequelize.DECIMAL(10, 2),
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2),
    },
    importe: {
      type: Sequelize.DECIMAL(10, 2),
    },
    year: {
      type: Sequelize.INTEGER,
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
