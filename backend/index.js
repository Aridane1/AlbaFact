require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "*",
};

const db = require("./models");

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Sync db without dropping.");
});

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/producto.routes")(app);
require("./routes/albaran.routes")(app);
require("./routes/information.routes")(app);
require("./routes/factura.routes")(app);

app.listen(PORT, () => {
  console.log("Server started on: " + PORT);
});
