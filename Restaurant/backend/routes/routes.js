const express = require('express');
const router = express.Router();

const { getRestaurants, getARestaurant, createARestaurant, updateARestaurant, deleteARestaurant } = require('../controller/restaurantController');
const { getArticles, createAnArticle, updateAnArticle, deleteAnArticle } = require('../controller/articleController');

router.route('/restaurant/').get(getRestaurants).post(createARestaurant);
router.route('/restaurant/:id').get(getARestaurant).put(updateARestaurant).delete(deleteARestaurant);

router.route('/article/:id_restaurant').get(getArticles);
router.route('/article/:id').put(updateAnArticle).delete(deleteAnArticle);
router.route('/article/').post(createAnArticle);


module.exports = router;