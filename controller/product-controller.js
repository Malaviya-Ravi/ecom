const { Product } = require('../models/product');
const Joi = require('joi');
const { func } = require('joi');

//get products
async function getProducts(req, res, next){
    const products = await Product.find();
    if(products.length)
    {
        return res.json({products});
    }
    return res.json({"Message" : "Ther Is No Product To Show, Please Insert Product First!"});
}

//add product

function validateProductBeforeAdd(body)
{
    const productSchema = Joi.object({
        name : Joi.string().min(4).max(50).required(),
        price : Joi.number().min(1).required(),
        discount : Joi.number(),
        category : Joi.string().required(),
        active : Joi.boolean(),
    });

    const result = productSchema.validate(body);
    return result;
}

async function addProduct(req, res, next){
    console.log("Handler");
    const validationResult = validateProductBeforeAdd(req.body);
    const productImage = "media/products/" + req.file.filename;
    if(validationResult.error)
    {
        return next(new Error(validationResult.error.details[0].message));
    }

    let product = new Product({
        ...validationResult.value,
        productImage,
    })

    product = await product.save();

    res.json({product});
}

module.exports = { getProducts, addProduct };