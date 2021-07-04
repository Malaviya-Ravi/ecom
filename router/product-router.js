const express = require('express');
const multer  = require('multer');
const mongoose = require('mongoose');
const productRouter = express.Router();
const { getProducts, addProduct, getProduct } = require('../controller/product-controller');
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware');
const path = require('path');

var tempMulter = multer({ dest: 'media/products/' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const filePath = path.join(__dirname, "../") + "media/products"
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      const fileName = mongoose.Types.ObjectId() + ".png";
      cb(null, fileName);
    }
  })
var upload = multer({storage});





productRouter.get('/', getProducts);
productRouter.get('/:product_id', getProduct);
productRouter.post('/',adminAuthMiddleware, upload.single("image"), addProduct);


module.exports = {productRouter};
