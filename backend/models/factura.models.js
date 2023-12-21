module.exports = (sequelize, Sequelize) => {
  const Factura = sequelize.define("facturas", {
    numAlbaranes: {
      type: Sequelize.JSON,
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });

  return Factura;
};
