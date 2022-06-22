const express = require('express');
const router = express.Router();

const { getOrdersByDeliveryman, getOrdersByConsumer, getOrdersByRestaurant, createOrder, updateAnOrder, deleteAnOrder } = require('../controller/orderController');

router.route('/order/restaurant/:id_restaurant').get(getOrdersByRestaurant);
router.route('/order/deliveryman/:id_deliveryman').get(getOrdersByDeliveryman);
router.route('/order/consumer/:id_consumer').get(getOrdersByConsumer);
router.route('/order/').post(createOrder);
router.route('/order/:id').put(updateAnOrder).delete(deleteAnOrder);


module.exports = router;