const asyncHandler = require ("express-async-handler");
const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");

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
        || !req.body.id_consumer
        || !req.body.id_restaurant) {
        res.status(400);
        throw new Error('Missing informations');
    }

    const order = await Order.create(req.body);

    const io = req.app.get("io");

    io.emit("NewOrder"+req.body.id_restaurant, order);

    res.status(201).json(order);
});

//@desc update an order
//@route PUT /api/order/:id
//@access Private
const updateAnOrder = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        res.status(400);
        throw new Error('Order not found');
    }

    const io = req.app.get("io");

    if(req.body.accepted){
        io.emit("OrderAccepted"+order.id_consumer, order);
        io.emit("OrderToFulfill", order);
    }
    if(req.body.received_by_deliveryman){
        io.emit("OrderReceived"+order.id_consumer, order);
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

    const io = req.app.get("io");

    io.emit("DeleteOrder"+order.id_consumer, order);

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