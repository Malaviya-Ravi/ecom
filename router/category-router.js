const express = require('express');
const categoryRouter = express.Router();
const { getCategories, addCategory } = require('../controller/category-controller');
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

categoryRouter.get('/', getCategories);
categoryRouter.post('/', adminAuthMiddleware, addCategory);


module.exports = { categoryRouter };