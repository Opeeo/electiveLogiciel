const express = require('express');
const router = express.Router();

const { getRestaurants } = require('../controller/controller');

router.get('/restaurants/', getRestaurants);

module.exports = router;