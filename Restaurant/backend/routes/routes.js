const express = require('express');
const router = express.Router();

const { getRestaurants, getARestaurant, createARestaurant, updateARestaurant, deleteARestaurant } = require('../controller/controller');

router.get('/restaurant/', getRestaurants);

router.get('/restaurant/:id', getARestaurant);

router.post('/restaurant/', createARestaurant);

router.put('/restaurant/:id', updateARestaurant);

router.delete('/restaurant/:id', deleteARestaurant);

module.exports = router;