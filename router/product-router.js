const express = require('express');
const productRouter = express.Router();
const { getProducts } = require('../controller/product-controller');

productRouter.get('', getProducts)


module.exports = {productRouter};