const asyncHandler= require ("express-async-handler");

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