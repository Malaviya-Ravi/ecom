const { User } = require('../models/user');
const Joi = require('joi');
const passowrdHash = require('password-hash');
const jwt = require('jsonwebtoken');

function getUsers(req, res){
    res.json({'message' : 'User API'});
}


//SignUp User
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


//LogIN User
function validateUserForLogIn(user)
{
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(6).max(30).required(),
    });
    return schema.validate(user);

}

async function loginUser(req, res, next)
{
    const result = validateUserForLogIn(req.body);
    if(result.error)
    {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const { email, password } = result.value;
    const user = await User.findOne({email : email});
    if(user)
    {
        const isPasswordMatched = passowrdHash.verify(password, user.password);
        if(isPasswordMatched)
        {
            const payload = {
                _id : user._id,
                isAdmin : user.isAdmin,
                email : user.email
            }
            const token = jwt.sign(payload, 'Ravi@3795');
            return res.json({sucess : 'login sucessfully!!', token})
        }
    }

    res.status(400);
    return next(new Error("Email or Password Is inValid"));


}

//Update User
function validateUserForUpdate(user)
{
    const schema = Joi.object({
        name : Joi.string().min(4).max(40),
        phone : Joi.string().min(10).max(12)
    });
    return schema.validate(user);
}

async function updateUser(req, res, next)
{
    const loggedInUser = req.session.user;
    const result = validateUserForUpdate(req.body);
    if(result.error)
    {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }
    else
    {
        let user = await User.findById(loggedInUser._id);
        user = Object.assign(user, result.value);
        user = await user.save();
        return res.json(user);
    }
}

async function updateUserById(req, res, next)
{
    const user_id = req.params.user_id;
    console.log(user_id);
    let user = await User.findById(user_id);
    console.log(user);
    user = Object.assign(user, req.body);
    user = await user.save();
    console.log("new user" + user);
    res.json(user);
}



module.exports = { getUsers, saveUser, loginUser, updateUser, updateUserById };