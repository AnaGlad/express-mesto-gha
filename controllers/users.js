const User = require("../models/user");

function getUserList(req, res) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: "Ошибка" }));
}

function getUser(req, res) {
  const { id } = req.params;
  return (User = findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: "Ошибка" })));
}

function createUser(req, res) {
  return User.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
        return;
      }
      res.status(500).send({ message: "Ошибка" });
    });
}

module.exports = {
  getUserList,
  getUser,
  createUser,
};
