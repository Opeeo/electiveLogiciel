const asyncHandler = require ("express-async-handler");
const Order = require("../models/orderModel");

//@desc Get orders of a restaurant
//@route GET /api/order/:id_restaurant
//@access Private
const getOrdersByRestaurant = asyncHandler(async (req, res, next) => {
    const order = await Order.find({"id_restaurant": req.params.id_restaurant});

    res.status(200).json(order);
});

//@desc Get orders of a consumer
//@route GET /api/order/:id_consumer
//@access Private
const getOrdersByConsumer = asyncHandler(async (req, res, next) => {
    const order = await Order.find({"id_consumer": req.params.id_consumer});

    res.status(200).json(order);
});

//@desc Get orders of a deliveryman
//@route GET /api/order/:id_deliveryman
//@access Private
const getOrdersByDeliveryman = asyncHandler(async (req, res, next) => {
    const order = await Order.find({"id_deliveryman": req.params.id_deliveryman});

    res.status(200).json(order);
});

//@desc Create an order
//@route POST /api/order/
//@access Private
const createOrder = asyncHandler(async (req, res, next) => {
    if(!req.body.price 
        || !req.body.articles
        || !req.body.adress 
        || !req.body.id_consumer) {
        res.status(400);
        throw new Error('Missing informations');
    }

    const order = await Order.create(req.body);

    const io = req.app.get("io");
    const users = req.app.get("users");
    console.log(order);
    io.to(users[users.length-1].id).emit("new_order", order);

    res.status(201).json(order);
});

//@desc update an order
//@route PUT /api/order/:id
//@access Private
const updateAnOrder = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedOrder);
});

//@desc delete an order
//@route delete /api/order/:id
//@access Private
const deleteAnOrder = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedorder = await Order.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedorder);
});

module.exports = {
    getOrdersByRestaurant,
    getOrdersByConsumer,
    getOrdersByDeliveryman,
    createOrder,
    updateAnOrder,
    deleteAnOrder
}