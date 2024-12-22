const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");

const user =new mongoose.Schema({
    username:{type:String , unique :true},
    password : String,
    email:String,
    role:String
})

user.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();
})

const User =mongoose.model('User',user)

module.exports=User ;