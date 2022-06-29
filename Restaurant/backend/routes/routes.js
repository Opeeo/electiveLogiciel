const express = require('express');
const router = express.Router();

const { getRestaurants, getARestaurant, createARestaurant, updateARestaurant, deleteARestaurant } = require('../controller/restaurantController');

const { getArticles, createAnArticle, updateAnArticle, deleteAnArticle } = require('../controller/articleController');

const { getMenus, createAMenu, updateAMenu, deleteAMenu } = require('../controller/menuController');

const { protect, IsConsumer, IsDeliveryman, IsDeveloper, IsRestaurator } = require('../middleware/authMiddleware');

//Routers for restaurant
router.route('/restaurant/').get(protect, IsRestaurator, getRestaurants).post(protect, IsRestaurator, createARestaurant);
router.route('/restaurant/:id').get(protect, IsRestaurator, getARestaurant).put(protect, IsRestaurator, updateARestaurant).delete(protect, IsRestaurator, deleteARestaurant);

//Routers for articles
router.route('/restaurant/article/:id_restaurant').get(protect, IsRestaurator, getArticles);
router.route('/restaurant/article/:id').put(protect, IsRestaurator, updateAnArticle).delete(protect, IsRestaurator, deleteAnArticle);
router.route('/restaurant/article/').post(protect, IsRestaurator, createAnArticle);

//Routeurs for menus
router.route('/restaurant/menu/:id_restaurant').get(protect, IsRestaurator, getMenus);
router.route('/restaurant/menu/:id').put(protect, IsRestaurator, updateAMenu).delete(protect, IsRestaurator, deleteAMenu);
router.route('/restaurant/menu/').post(protect, IsRestaurator, createAMenu);

module.exports = router;