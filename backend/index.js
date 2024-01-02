require("dotenv").config();
const jwt = require("jsonwebtoken");
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

app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  if (req.headers.authorization.indexOf("Basic ") === 0) {
    // verify auth basic credentials

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    //saca la informacion que llegue desde el req.body

    const [email, password] = credentials.split(":");
    req.body.email = email;
    req.body.password = password;

    return next();
  }

  token = token.replace("Bearer ", "");
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});

require("./routes/producto.routes")(app);
require("./routes/albaran.routes")(app);
require("./routes/information.routes")(app);
require("./routes/user.routes")(app);
require("./routes/cliente.routes")(app);

app.listen(PORT, () => {
  console.log("Server started on: " + PORT);
});
