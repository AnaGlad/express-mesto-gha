const router = require('express').Router();

const {
  getUserList,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUserList);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
