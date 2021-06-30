const { User } = require('../models/user');
const Joi = require('joi');
const passowrdHash = require('password-hash');

function getUsers(req, res){
    res.json({'message' : 'User API'});
}

function validateUserForRegistration(user)
{
    const schema = Joi.object({
        name : Joi.string().min(4).max(40).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).max(30).required(),
        repassword : Joi.string().min(6).max(30).required(),
        phone : Joi.string().min(10).max(12)

    });
    return schema.validate(user);

}

async function saveUser(req, res, next){

    

    const validateResult = validateUserForRegistration(req.body);

    if(validateResult.error)
    {
        res.status(400);
        return next(new Error(validateResult.error.details[0].message));
    }
    const userData = validateResult.value;

    if(userData.password !== userData.repassword)
    {
        res.status(400);
        return next(new Error("password not matched!!"));
    }
    
    //Check User Is Unique

    let isExists = await User.isExists(userData.email);

    if(!isExists)
    {
        userData.password = passowrdHash.generate(userData.password);
        user = await new User(userData).save();
        res.json(user);
    }
    else
    {
        res.status(400);
        return next(new Error('Email Is Already Registered!'));
    }
    
   
}

module.exports = { getUsers, saveUser };