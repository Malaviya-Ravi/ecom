function getUsers(req, res){
    res.json({'message' : 'User API'});
}


function saveUser(req, res){
    res.json({message : 'Post Request To Save User'});
}

module.exports = { getUsers, saveUser };