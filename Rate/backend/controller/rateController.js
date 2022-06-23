const asyncHandler = require ("express-async-handler");
const Rate = require("../models/rateModel");

//@desc Get rates of a deliveryman
//@route GET /api/rate/deliveryman/:id
//@access Private
const getRatesOfADeliveryman = asyncHandler(async (req, res, next) => {
    const rates = await Rate.find({"id_deliveryman": req.params.id});

    res.status(200).json(rates);
});

//@desc Get rates of a deliveryman
//@route GET /api/rate/restaurant/:id
//@access Private
const getRatesOfARestaurant = asyncHandler(async (req, res, next) => {
    const rates = await Rate.find({"id_restaurant": req.params.id});

    res.status(200).json(rates);
});

//@desc Get rates given by a consumer
//@route GET /api/rate/consumer/:id
//@access Private
const getRatesGivenByAConsumer = asyncHandler(async (req, res, next) => {
    const rates = await Rate.find({"id_consumer": req.params.id});

    res.status(200).json(rates);
});

//@desc Create an rate
//@route POST /api/rate/
//@access Private
const createRate = asyncHandler(async (req, res, next) => {
    if(!req.body.id_consumer 
        || !req.body.stars_number) {
        res.status(400);
        throw new Error('Missing informations');
    }

    if(!req.body.id_deliveryman && !req.body.id_restaurant){
        res.status(400);
        throw new Error("Error of input : must give an id of a deliveryman or a restaurant");
    }

    if(req.body.id_deliveryman && req.body.id_restaurant){
        res.status(400);
        throw new Error("Error of input : you can't give an id of a deliveryman and a restaurant");
    }

    const rate = await Rate.create(req.body);

    res.status(201).json(rate);
});

//@desc update a rate
//@route PUT /api/rate/:id
//@access Private
const updateARate = asyncHandler(async (req, res, next) => {

    const rate = await Rate.findById(req.params.id);

    if(!rate){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    if(req.body.id_deliveryman && req.body.id_restaurant){
        res.status(400);
        throw new Error("Error of input : you can't give an id of a deliveryman and a restaurant");
    }

    const updatedRate = await Rate.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedRate);
});

//@desc delete a rate
//@route delete /api/rate/:id
//@access Private
const deleteARate = asyncHandler(async (req, res, next) => {

    const rate = await Rate.findById(req.params.id);

    if(!rate){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedRate = await Rate.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedRate);
});

module.exports = {
    getRatesOfADeliveryman,
    getRatesOfARestaurant,
    getRatesGivenByAConsumer,
    createRate,
    updateARate,
    deleteARate
}