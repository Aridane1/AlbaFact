const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/config.js")[env];

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user.models.js")(sequelize, Sequelize);
db.Information = require("./information.models.js")(sequelize, Sequelize);
db.Producto = require("./producto.model.js")(sequelize, Sequelize);
db.Factura = require("./factura.models.js")(sequelize, Sequelize);
db.Albaran = require("./albaran.models.js")(sequelize, Sequelize);

module.exports = db;
