const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequestError = require('../errors/bad-request-err'); // 400
const ForbiddenActionError = require('../errors/forbidden-action'); // 403

const OK_CODE = 200;

function getCardList(req, res, next) {
  return Card.find({})
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch(next);
}

function postCard(req, res, next) {
  return Card.create({ ...req.body, owner: req.user })
    .then((card) => {
      res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`));
      } else {
        next(err);
      }
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (req.user._id !== card.owner.toString()) {
        console.log('req.user._id');
        console.log(card.owner.toString());
        throw new ForbiddenActionError('Нет прав для совершения этого действия');
      }
      Card.deleteOne({ _id: cardId });
      return res.status(OK_CODE).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else { next(err); }
    })
    .catch(next);
}

function putLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user_id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.status(OK_CODE).send({ message: 'Лайк поставлен' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else {
        next(err);
      }
    })
    .catch(next);
}

function deleteLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.status(OK_CODE).send({ message: 'Лайк удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else {
        next(err);
      }
    })
    .catch(next);
}

module.exports = {
  getCardList,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
