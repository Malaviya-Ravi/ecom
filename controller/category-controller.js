const { Category } = require('../models/category');
const Joi = require('joi');


async function getCategories(req, res, next){
    const categories = await Category.find().select('name -_id');
    res.json({categories});
}


//Add Category
function validateCategory(user)
{
    const schema = Joi.object({
        name : Joi.string().min(1).max(20).required()
    })
    return schema.validate(user);
}

async function addCategory(req, res, next)
{
    const result = validateCategory(req.body);
    if(result.error)
    {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }
    let category = result.value;

    let isExists = await Category.isExists(category.name);

    if(!isExists)
    {
        const name = category.name;
        category = new Category({name});
        const categoryObj = await category.save();
        res.json({categoryObj});
    }
    else
    {
        res.status(400);
        return next(new Error(`${category.name} Category Is Already Exist!!`));
    }


    
}

module.exports = { getCategories, addCategory };
