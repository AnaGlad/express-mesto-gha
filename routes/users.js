const router = require('express').Router();
// const { celebrate, Joi, errors, Segments } = require('celebrate');
const updateUserValidation = require('../validation/updateUserValidation');

const {
  getUserList,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUserList);

router.get('/me', getUserInfo);

router.get('/:userId', getUser);

router.patch('/me', updateUserValidation, updateUserProfile);

router.patch('/me/avatar', updateUserValidation, updateUserAvatar);

module.exports = router;
