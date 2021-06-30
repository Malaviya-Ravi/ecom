const express = require('express');
const categoryRouter = express.Router();
const { getCategories } = require('../controller/category-controller');

categoryRouter.get('', getCategories);


module.exports = {categoryRouter};