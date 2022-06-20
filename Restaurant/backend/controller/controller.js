const asyncHandler= require ("express-async-handler");
const Restaurant = require ('../models/restaurantModel');

//@desc Get restaurants
//@route GET /api/restaurants/
//@access Private
const getRestaurants = asyncHandler(async (req, res, next) => {
    res.status(200).json({message: 'Get restaurants'});
});

//throw new Error()

module.exports = {
    getRestaurants,
}