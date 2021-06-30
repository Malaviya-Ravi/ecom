const express = require('express');
require('./database/connection');
const morgan = require('morgan');
const  userRouter  = require('./router/user-router');
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));


app.listen(3000, ()=> {
    console.log(`Listening On Port 3000`);
}) 

app.get('/', (req, res) => {
    res.json({'message': 'succses'});
})
const APIRouter = express.Router();
app.use('/api', APIRouter)

APIRouter.use('/users', userRouter);