const express = require('express');
const router = express.Router();

const { getRestaurants, getARestaurant, createARestaurant, updateARestaurant, deleteARestaurant } = require('../controller/restaurantController');

const { getArticles, createAnArticle, updateAnArticle, deleteAnArticle } = require('../controller/articleController');

const { getMenus, createAMenu, updateAMenu, deleteAMenu } = require('../controller/menuController');

//Routers for restaurant
router.route('/restaurant/').get(getRestaurants).post(createARestaurant);
router.route('/restaurant/:id').get(getARestaurant).put(updateARestaurant).delete(deleteARestaurant);

//Routers for artciles
router.route('/article/:id_restaurant').get(getArticles);
router.route('/article/:id').put(updateAnArticle).delete(deleteAnArticle);
router.route('/article/').post(createAnArticle);

//Routeurs for menus
router.route('/menu/:id_restaurant').get(getMenus);
router.route('/menu/:id').put(updateAMenu).delete(deleteAMenu);
router.route('/menu/').post(createAMenu);

module.exports = router;