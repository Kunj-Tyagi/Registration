const mongoose =require("mongoose");
const {required} = require("joi");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneno:{
        type:Number,
        required:true,
    }
});

const User = mongoose.model('User',userSchema);

module.exports=User;