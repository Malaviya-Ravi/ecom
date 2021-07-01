const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categrySchema = new Schema({
    name : { type : String, required : true},
   
},
 { 
     timestamps : 
     { 
      createdAt : 'created_at',
      updatedAt : 'updated_at'
    }
});

categrySchema.statics.isExists = async function isExists(name){
    const category = await this.findOne({name : name});
    return (category) ? true : false;
}


const Category = mongoose.model('category', categrySchema);
module.exports = { Category }; 