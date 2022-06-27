const asyncHandler = require("express-async-handler");
const Restaurant = require('../models/restaurantModel');
const mongoose = require('mongoose');

//@desc Get restaurants
//@route GET /api/restaurant/
//@access Private
const getRestaurants = asyncHandler(async (req, res, next) => {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
});

//@desc Get a restaurant
//@route GET /api/restaurant/:id
//@access Private
const getARestaurant = asyncHandler(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);

    res.status(200).json(restaurant);
});

//@desc Create a restaurant
//@route POST /api/restaurant/
//@access Private
const createARestaurant = asyncHandler(async (req, res, next) => {
    if (!req.body.name || !req.body.id_restaurator) {
        res.status(400);
        throw new Error('Please provide an id of a restaurator or a restaurant name');
    }

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json(restaurant);
});

//@desc update a restaurant
//@route PUT /api/restaurant/:id
//@access Private
const updateARestaurant = asyncHandler(async (req, res, next) => {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedRestaurant);
});

//@desc delete a restaurant
//@route DELETE /api/restaurant/:id
//@access Private
const deleteARestaurant = asyncHandler(async (req, res, next) => {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedRestaurant);
});

module.exports = {
    getRestaurants,
    getARestaurant,
    createARestaurant,
    updateARestaurant,
    deleteARestaurant,
}