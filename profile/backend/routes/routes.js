const express = require('express');
const router = express.Router();

const { getProfiles, getAProfile, registerUser, updateAProfile, deleteAProfile, loginUser } = require('../controller/profileController');
const { getDeliveryman, getADeliveryman, createADeliveryman, updateADeliveryman, deleteADeliveryman } = require('../controller/deliverymanController');
const { getConsumer, getAConsumer, createAConsumer, updateAConsumer, deleteAConsumer } = require('../controller/consumerController');
const { getDeveloper, getADeveloper, createADeveloper, updateADeveloper, deleteADeveloper } = require('../controller/developerController');
const { getRestaurator, getARestaurator, createARestaurator, updateARestaurator, deleteARestaurator } = require('../controller/restauratorController');
const { getASponsorOfAProfile, getSponsoredProfile, createASponsorship, removeASponsorship } = require("../controller/sponsorshipController");

const {protect} = require('../middleware/authMiddleware')


router.route('/profile/').get(protect, getProfiles).post(registerUser);
router.route('/profile/:id').get(protect, getAProfile).put(protect, updateAProfile).delete(protect, deleteAProfile);
router.route('/profile/login').post(loginUser);

router.route('/profile/deliveryman/').get(getDeliveryman).post(createADeliveryman);
router.route('/profile/deliveryman/:id').get(getADeliveryman).put(updateADeliveryman).delete(deleteADeliveryman);

router.route('/profile/consumer/').get(getConsumer).post(createAConsumer);
router.route('/profile/consumer/:id').get(getAConsumer).put(updateAConsumer).delete(deleteAConsumer);

router.route('/profile/developer/').get(getDeveloper).post(createADeveloper);
router.route('/profile/developer/:id').get(getADeveloper).put(updateADeveloper).delete(deleteADeveloper);

router.route('/profile/restaurator/').get(getRestaurator).post(createARestaurator);
router.route('/profile/restaurator/:id').get(getARestaurator).put(updateARestaurator).delete(deleteARestaurator);

router.route('/profile/sponsorship/sponsor/:id').get(getASponsorOfAProfile);
router.route('/profile/sponsorship/sponsored/:id').get(getSponsoredProfile);
router.route('/profile/sponsorship/').post(createASponsorship).delete(removeASponsorship);

module.exports = router;