const express = require('express');
const userRouter = express.Router();
const { getUsers, saveUser } = require('../controller/user-controller');

userRouter.get('', getUsers);
userRouter.post('', saveUser);


module.exports = {userRouter};