const express = require('express');
const categoryRouter = express.Router();
const { getCategories, addCategory, getCategory } = require('../controller/category-controller');
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

categoryRouter.get('/', getCategories);
categoryRouter.get('/:category_id', getCategory);
categoryRouter.post('/', adminAuthMiddleware, addCategory);


module.exports = { categoryRouter };