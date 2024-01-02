module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("clientes", {
    name: {
      type: Sequelize.STRING,
    },
    nif: {
      type: Sequelize.STRING,
    },
    cp: {
      type: Sequelize.INTEGER,
    },
    calle: {
      type: Sequelize.STRING,
    },
    localidad: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
    },
  });
  return Cliente;
};
