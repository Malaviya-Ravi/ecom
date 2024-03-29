const express = require('express');
require('./database/connection');
const morgan = require('morgan');
const  {userRouter}  = require('./router/user-router');
const  {productRouter}  = require('./router/product-router');
const  {orderRouter}  = require('./router/order-router');
const  {categoryRouter}  = require('./router/category-router');
const handleErrors = require('./middlewares/error-handler');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));


app.listen(3000, ()=> {
    console.log(`Listening On Port 3000`);
}) 

app.get('/', (req, res) => {
    res.json({'message': 'succses'});
})
const APIRouter = express.Router();
app.use('/api', APIRouter)
APIRouter.get('', (req, res) => {
    res.json({'message' : 'API is working'});
})

APIRouter.use('/users', userRouter);
APIRouter.use('/products', productRouter);
APIRouter.use('/orders', orderRouter);
APIRouter.use('/categories', categoryRouter);

APIRouter.get("/media/products/*", (req, res, next) => {
    const path = req.url;
    const filePath = `${__dirname}${path}`;
    console.log(filePath);
    res.sendFile(filePath, (err) => {
        next();
    });
});


app.use(handleErrors);