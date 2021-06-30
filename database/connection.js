const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/ecom'


async function createConnection(url)
{
    const connection = mongoose.connect(url,
         {
              useNewUrlParser : true, 
              useUnifiedTopology : true
        });
    
    if(connection)
    {
        console.log("MongoDB Connection Established!!");
    }
}


createConnection(DB_URL);