const express = require('express');
const router = express.Router();

const { getProfiles, getAProfile, creatAProfile, updateAProfile, deleteAProfile } = require('../controller/profileController');
const { getDeliveryman, getADeliveryman, createADeliveryman, updateADeliveryman, deleteADeliveryman } = require('../controller/deliverymanController');
const { getConsumer, getAConsumer, createAConsumer, updateAConsumer, deleteAConsumer } = require('../controller/consumerController');
const { getDeveloper, getADeveloper, createADeveloper, updateADeveloper, deleteADeveloper } = require('../controller/developerController');
const { getRestaurator, getARestaurator, createARestaurator, updateARestaurator, deleteARestaurator } = require('../controller/RestauratorController');

router.route('/profile/').get(getProfiles).post(creatAProfile);
router.route('/profile/:id').get(getAProfile).put(updateAProfile).delete(deleteAProfile);

router.route('/deliveryman/').get(getDeliveryman).post(createADeliveryman);
router.route('/deliveryman/:id').get(getADeliveryman).put(updateADeliveryman).delete(deleteADeliveryman);

router.route('/consumer/').get(getConsumer).post(createAConsumer);
router.route('/consumer/:id').get(getAConsumer).put(updateAConsumer).delete(deleteAConsumer);

router.route('/developer/').get(getDeveloper).post(createADeveloper);
router.route('/developer/:id').get(getADeveloper).put(updateADeveloper).delete(deleteADeveloper);

router.route('/restaurator/').get(getRestaurator).post(createARestaurator);
router.route('/restaurator/:id').get(getARestaurator).put(updateARestaurator).delete(deleteARestaurator);

module.exports = router;