const Order = require("../models/orderModel");
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require("../models/productModel");

// create new order...
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{


        const {     shippingInfo,
                    orderItems,
                    paymentInfo,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
            } = req.body;

            const order =  await Order.create({
                    shippingInfo,
                    orderItems,
                    paymentInfo,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                    paidAt:Date.now(),
                    user:req.user._id,
            });

                res.status(201).json({
                    success:true,
                    order,
                });
});


// get Single Order..
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

        if(!order){
            return next(new ErrorHandler("Order not found with this Id",404));
        }

        res.status(200).json({
            success:true,
            order,
        });
});

//get login in User orders...
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find({user: req.user._id});

        res.status(200).json({
            success:true,
            order,
        });
});


//get all orders for admin ...
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find();

    let totalAmount = 0;

    order.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

        res.status(200).json({
            success:true,
            totalAmount,
            order,
        });
});

// Update Order status -- Admin..
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }

    order.orderItems.forEach(async (o) =>{
        await updateStock(o.product,o.quantity)
    });

     order.orderStatus = req.body.status;
     
     if(req.body.status ==="Delivered"){
        order.deliveredAt=Date.now();
     }

     await order.save({ validateBeforeSave:false})

        res.status(200).json({
            success:true,
            
        });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock-=quantity;

    await product.save({validateBeforeSave});

}


//Delete order Admin ...
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

   await order.remove();

        res.status(200).json({
            success:true,
            totalAmount,
            order,
        });
});