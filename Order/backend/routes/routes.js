const express = require('express');
const router = express.Router();

const { getOrdersByDeliveryman, getOrdersByConsumer, getOrdersByRestaurant, createOrder, updateAnOrder, deleteAnOrder } = require('../controller/orderController');

const { protect, IsConsumer, IsDeliveryman, IsDeveloper, IsRestaurator } = require('../middleware/authMiddleware');

router.route('/order/restaurant/:id_restaurant').get(protect, getOrdersByRestaurant);
router.route('/order/deliveryman/:id_deliveryman').get(protect, getOrdersByDeliveryman);
router.route('/order/consumer/:id_consumer').get(protect, getOrdersByConsumer);
router.route('/order/').post(protect, createOrder);
router.route('/order/:id').put(protect, updateAnOrder).delete(protect, deleteAnOrder);


module.exports = router;