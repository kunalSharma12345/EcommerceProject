const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true,"Please enter product Name"]
    },
    description:{
        type:String,
        required:[true,"Please enter the product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the product price"],
        maxlength:[8,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
    {
        public_id:{
        type:String,
        required:true
        },
        url:{
        type:String,
        required:true
        }
    }
        ], 
    category:{
        type:String,
        required:[true,"Please enter the product category"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter the product Stock"],
        maxlength:[4,"Stock cant exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            // user:{
            //     type:mongoose.Schema.ObjectId,
            //     ref:"User",
            //     required:true,
            // },
            name:{
                type:String,
                required:true,
            },
            rating:{
                    type:Number,
                    required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

module.exports = mongoose.model("Product",productSchema);