module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("producto", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });
  return Producto;
};
