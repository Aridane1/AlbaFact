const jwt = require("jsonwebtoken");
const utils = require("../libs/utils");
const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

exports.signin = (req, res) => {
  const user = req.body.email;
  const pwd = req.body.password;
  console.log(pwd);
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required.",
    });
  }

  User.findOne({ where: { email: user } })
    .then((data) => {
      const result = bcrypt.compareSync(pwd, data.password);
      if (!result) return res.status(401).send("Password not valid!");

      const token = utils.generateToken(data);
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    User.findByPk(user.id)
      .then((data) => {
        if (!user.id) {
          return res.status(401).json({
            error: true,
            message: "Invalid user.",
          });
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id,
        });
      });
  });
};
