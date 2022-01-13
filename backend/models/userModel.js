const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should be more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password should be greater than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

// hashing the password..
userSchema.pre("save",async function(next){ 

        if(!this.isModified("password")){
            next();
        }
        this.password = await bcrypt.hash(this.password,10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}


// Compare Password.. 
userSchema.methods.comparePassword = async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password)
}


// generating password reset token..
userSchema.methods.getResetPasswordToken = function(){

        // generating token..
        const resetToken = crypto.randomBytes(20).toString("hex");

     // hex is used so that we don't get buffer data..

// hashing and adding resetPasswordToken to userSchema..
this.resetPasswordToken = crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");


    this.resetPasswordExpire = Date.now()+ 15*60*1000;
    return resetToken;


};

module.exports = mongoose.model("User",userSchema);