module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    dni: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return User;
};
