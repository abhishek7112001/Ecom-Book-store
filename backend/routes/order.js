const router= require("express").Router();
const User= require("../models/user");
const Order = require('../models/order');
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");

//place order
router.post('/place-order', authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderData of order){
            const newOrder = new Order({user: id, book: orderData._id});
            const orderDataFromDb =await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDataFromDb._id},
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: {cart: orderData._id},
            })
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})


//get order history of a particular user
router.get("/get-order-history", authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {
                path: "book",
            },
        });
        const ordersData =userData.orders.reverse();

        return res.json({
            status: "success",
            data: ordersData,
        });
    } catch (error) {    
        return res.status(500).json({message: "Internal server error"});
    }
        
});

//get all orders --admin
router.get('/get-all-orders', authenticateToken, async(req, res)=>{
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .populate({
            path:"User",
        })
        .sort({createdAt: -1})

        return res.json({
            status: "success",
            data: userData,
        });

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})

//update order --admin
router.put('/update-status', authenticateToken, async(req, res)=>{
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});

        return res.json({
            status: "success",
            message: "Order status updated successfully",
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;