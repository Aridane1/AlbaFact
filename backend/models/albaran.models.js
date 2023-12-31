module.exports = (sequelize, Sequelize) => {
  const Albaran = sequelize.define("albaranes", {
    numAlbaran: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    year: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "users", key: "id" },
    },
    date: {
      type: Sequelize.DATE,
    },
  });
  return Albaran;
};
