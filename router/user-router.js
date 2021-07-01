const express = require('express');
const userRouter = express.Router();
const { getUsers, saveUser, loginUser, updateUser, updateUserById } = require('../controller/user-controller');
const { userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

userRouter.get('/', getUsers);
userRouter.post('/', saveUser);
userRouter.post('/login', loginUser);
userRouter.put('/', userAuthMiddleware, updateUser);
userRouter.put('/:user_id', adminAuthMiddleware, updateUserById );



module.exports = {userRouter};