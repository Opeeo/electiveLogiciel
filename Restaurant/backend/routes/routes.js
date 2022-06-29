const express = require('express');
const router = express.Router();

const { getRestaurants, getARestaurant, createARestaurant, updateARestaurant, deleteARestaurant } = require('../controller/restaurantController');

const { getArticles, createAnArticle, updateAnArticle, deleteAnArticle } = require('../controller/articleController');

const { getMenus, createAMenu, updateAMenu, deleteAMenu } = require('../controller/menuController');

const { protect, IsConsumer, IsDeliveryman, IsDeveloper, IsRestaurantOwner } = require('../middleware/authMiddleware');

//Routers for restaurant
router.route('/restaurant/').get(getRestaurants).post(protect, IsRestaurantOwner, createARestaurant);
router.route('/restaurant/:id').get(protect, IsRestaurantOwner, getARestaurant).put(protect, IsRestaurantOwner, updateARestaurant).delete(protect, IsRestaurantOwner, deleteARestaurant);

//Routers for articles
router.route('/restaurant/article/:id_restaurant').get(protect, IsRestaurantOwner, getArticles);
router.route('/restaurant/article/:id').put(protect, IsRestaurantOwner, updateAnArticle).delete(protect, IsRestaurantOwner, deleteAnArticle);
router.route('/restaurant/article/').post(protect, IsRestaurantOwner, createAnArticle);

//Routeurs for menus
router.route('/restaurant/menu/:id_restaurant').get(protect, IsRestaurantOwner, getMenus);
router.route('/restaurant/menu/:id').put(protect, IsRestaurantOwner, updateAMenu).delete(protect, IsRestaurantOwner, deleteAMenu);
router.route('/restaurant/menu/').post(protect, IsRestaurantOwner, createAMenu);

module.exports = router;