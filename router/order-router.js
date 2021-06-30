const express = require('express');
const orderRouter = express.Router();
const { getOrders } = require('../controller/order-controller');

orderRouter.get('', getOrders);


module.exports = {orderRouter};