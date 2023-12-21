module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("producto", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Producto;
};
