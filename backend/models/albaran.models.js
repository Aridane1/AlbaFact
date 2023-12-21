module.exports = (sequelize, Sequelize) => {
  const Albaran = sequelize.define("albaranes", {
    numAlbaran: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.DATE,
    },
  });
  return Albaran;
};
