const router = require('express').Router();

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

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
