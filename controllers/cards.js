const Card = require("../models/card");
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const OK_CODE = 200;

function getCardList(req, res) {
  return Card.find({})
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch((err) =>
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" })
    );
}

function postCard(req, res) {
  console.log(req.body);
  console.log(req.user._id);
  return Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(OK_CODE).send(card);
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

function deleteCard(req, res) {
  const { cardId } = req.params;
  console.log(cardId);
  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      }
      res.status(OK_CODE).send({ message: "Карточка удалена" });
    })
    .catch((err) => {
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
    });
}

function putLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      }
      console.log(card);
      res.status(OK_CODE).send({ message: "Лайк поставлен" });
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

function deleteLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемая карточка не найдена" });
      }
      console.log(card);
      res.status(OK_CODE).send({ message: "Лайк удален" });
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
  getCardList,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
