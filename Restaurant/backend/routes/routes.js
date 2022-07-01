const express = require('express');
const router = express.Router();

const { getRestaurants, getARestaurant, createARestaurant, updateARestaurant, deleteARestaurant } = require('../controller/restaurantController');

const { getArticles, createAnArticle, updateAnArticle, deleteAnArticle } = require('../controller/articleController');

const { getMenus, createAMenu, updateAMenu, deleteAMenu } = require('../controller/menuController');

const { protect, IsConsumer, IsDeliveryman, IsDeveloper, IsRestaurator } = require('../middleware/authMiddleware');


/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - id_restaurator
 *       properties:
 *         name:
 *           type: string
 *           description: The restaurant name
 *         siret_number:
 *           type: int
 *           description: The restaurant siret
 *         description:
 *           type: string
 *           description: The restaurant description
 *         street_name:
 *           type: string
 *           description: The restaurant street
 *         additional_address:
 *           type: string
 *           description: The restaurant address infos
 *         street_number:
 *           type: int
 *           description: The restaurant street number
 *         postal_code:
 *           type: int
 *           description: The restaurant postal code
 *         city:
 *           type: string
 *           description: The restaurant city
 *         type:
 *           type: string
 *           description: The restaurant type
 *         id_restaurator:
 *           type: string
 *           description: The restaurant owner
 *       example:
 *         name: mcdonalds
 *         siret_number: 1234
 *         description: Fast food
 *         street_name: street
 *         additional_adress: 
 *         street_number: 1
 *         postal_code: 123456
 *         city: city
 *         type: fast food
 *         id_restorator: 1234
 *     Menu:
 *       type: object
 *       required:
 *         - name
 *         - id_restaurant
 *       properties:
 *         name:
 *           type: string
 *           description: The menu name
 *         type:
 *           type: string
 *           description: The menu type
 *         price:
 *           type: int
 *           description: The menu price
 *         articles:
 *           type: array
 *           description: The article list of the menu
 *         id_restaurant:
 *           type: string
 *           description: The restaurant that created the menu
 *       example:
 *         name: menu name
 *         type: type
 *         price: 30
 *         description: A menu
 *         articles: ["drink", "sandwich"]
 *         id_restoratant: 1234
 *     Article:
 *       type: object
 *       required:
 *         - name
 *         - id_restaurant
 *       properties:
 *         name:
 *           type: string
 *           description: The article name
 *         type:
 *           type: string
 *           description: The article type
 *         price:
 *           type: int
 *           description: The article pice
 *         description:
 *           type: string
 *           description: The article description
 *         id_restaurant:
 *           type: string
 *           description: The restaurant that created the article
 *       example:
 *         name: article name
 *         type: type
 *         price: 5
 *         description: An article
 *         id_restorant: 1234
 */

 /**
  * @swagger
  * tags:
  *   name: Restaurant
  *   description: The Restaurant managing API
  */

 /**
 * @swagger
 * /api/restaurant:
 *   get:
 *     summary: Returns the list of all the restaurant
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: The list of the restaurant
 */

 /**
 * @swagger
 * /api/restaurant:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       parameters:
 *           name: name
 *           in: query
 *           required: true
 *           description: The restaurant name
 *     responses:
 *       200:
 *         description: The restaurant was successfully created
 *       500:
 *         description: Some server error
 */

//Routers for restaurant
router.route('/restaurant/').get(getRestaurants).post(protect, IsRestaurator, createARestaurant);

/**
 * @swagger
 * /api/restaurant/{id}:
 *   get:
 *     summary: Get the restaurant by id
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id
 *     responses:
 *       200:
 *         description: The restaurant description by id
 *       404:
 *         description: The restaurant was not found
 */

/**
 * @swagger
 * /api/restaurant/{id}:
 *  put:
 *    summary: Update the restaurant by the id
 *    tags: [Restaurant]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The restaurant id
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: The resraurant was updated
 *      404:
 *        description: The restaurant was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/restaurant/{id}:
 *   delete:
 *     summary: Remove the restaurant by id
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id
 * 
 *     responses:
 *       200:
 *         description: The restaurant was deleted
 *       404:
 *         description: The restaurant was not found
 */

router.route('/restaurant/:id').get(getARestaurant).put(protect, IsRestaurator, updateARestaurant).delete(protect, IsRestaurator, deleteARestaurant);

//Routers for articles
router.route('/restaurant/article/:id_restaurant').get(protect, getArticles);
router.route('/restaurant/article/:id').put(protect, IsRestaurator, updateAnArticle).delete(protect, IsRestaurator, deleteAnArticle);
router.route('/restaurant/article/').post(protect, IsRestaurator, createAnArticle);

//Routeurs for menus
router.route('/restaurant/menu/:id_restaurant').get(protect, getMenus);
router.route('/restaurant/menu/:id').put(protect, IsRestaurator, updateAMenu).delete(protect, IsRestaurator, deleteAMenu);
router.route('/restaurant/menu/').post(protect, IsRestaurator, createAMenu);

module.exports = router;