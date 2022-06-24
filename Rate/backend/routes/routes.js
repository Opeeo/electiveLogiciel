const express = require('express');
const router = express.Router();

const { getRatesOfADeliveryman, getRatesOfARestaurant, getRatesGivenByAConsumer, createRate, updateARate, deleteARate } = require("../controller/rateController");

router.route('/rate/deliveryman/:id').get(getRatesOfADeliveryman);
router.route('/rate/restaurant/:id').get(getRatesOfARestaurant);
router.route('/rate/consumer/:id').get(getRatesGivenByAConsumer);
router.route('/rate/').post(createRate);
router.route('/rate/:id').put(updateARate).delete(deleteARate);

module.exports = router;