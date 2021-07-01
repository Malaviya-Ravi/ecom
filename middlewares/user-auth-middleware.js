const jwt = require('jsonwebtoken');

function userAuthMiddleware(req, res, next)
{
    try{
    const bearerToken = req.headers.authorization;
    let token = null;
    token = bearerToken.split(" ")[1];
    const payload = jwt.verify(token, 'Ravi@3795');
    req.session = {
        user : payload
    };
    next();
    }catch(error){
       res.status(401);
       return res.json({"Error" : "Please LogIn First!"}); 
    }
}

function adminAuthMiddleware(req, res, next)
{
    try{
    const bearerToken = req.headers.authorization;
    let token = null;
    token = bearerToken.split(" ")[1];
    const payload = jwt.verify(token, 'Ravi@3795');
    req.session = {
        user : payload
    };

    if(payload.isAdmin)
    {
        return next();
    }
    res.status(401);
    return res.json({"Error" : "You Are Not Authorized To Access Resource!"});
    
    }catch(error){
       res.status(401);
       return res.json({"Error" : "Please LogIn First!"}); 
    }
}




module.exports = { userAuthMiddleware, adminAuthMiddleware };