const User = require("../models/user");
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const OK_CODE = 200;

function getUserList(req, res) {
  return User.find({})
    .then((users) => res.status(OK_CODE).send(users))
    .catch((err) =>
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" })
    );
}

function getUser(req, res) {
  const { userId } = req.params;
  console.log(userId);
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      res.status(OK_CODE).send(user);
    })
    .catch((err) =>
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" })
    );
}

function createUser(req, res) {
  return User.create({ ...req.body })
    .then((user) => {
      res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
        return;
      }
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
    });
}

function updateUserProfile(req, res) {
  return User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true,
    }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
        return;
      }
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
    });
}

function updateUserAvatar(req, res) {
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
    }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
        return;
      }
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
    });
}

module.exports = {
  getUserList,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
