const userRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { userProfilInfoSchema, userAvatarSchema, userIdSchema } = require('../middlewares/user-validation');
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', celebrate({ params: userIdSchema }), getUser);
userRouter.patch('/me', celebrate({ body: userProfilInfoSchema }), updateUserInfo);
userRouter.patch('/me/avatar', celebrate({ body: userAvatarSchema }), updateUserAvatar);

module.exports = userRouter;
