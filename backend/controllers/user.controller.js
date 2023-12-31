const db = require("../models");
const bcrypt = require("bcryptjs");
const utils = require("../libs/utils");
const User = db.User;

exports.create = (req, res) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dni: req.body.dni,
    direccion: req.body.direccion,
  };

  User.findOne({ where: { email: newUser.email } }).then((data) => {
    if (data) {
      const result = bcrypt.compareSync(newUser.password, data.password);
      if (!result) return res.status(400).send("Password not valid");

      const token = utils.generateToken(data);
      const userObject = utils.getCleanUser(data);
      return res.json({ token: token, user: userObject });
    }
    newUser.password = bcrypt.hashSync(req.body.password);
    User.create(newUser)
      .then((user) => {
        const token = utils.generateToken(user);
        const userObj = utils.getCleanUser(user);
        res.json({ token: token, user: userObj });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete user with id " + id,
      });
    });
};
