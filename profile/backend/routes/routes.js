const express = require('express');
const router = express.Router();

const { protect, IsConsumer, IsDeliveryman, IsDeveloper, IsRestaurator } = require('../middleware/authMiddleware');

const { getProfiles, getAProfile, registerUser, updateAProfile, deleteAProfile, loginUser } = require('../controller/profileController');
const { getDeliveryman, getADeliveryman, createADeliveryman, updateADeliveryman, deleteADeliveryman } = require('../controller/deliverymanController');
const { getConsumer, getAConsumer, createAConsumer, updateAConsumer, deleteAConsumer } = require('../controller/consumerController');
const { getDeveloper, getADeveloper, createADeveloper, updateADeveloper, deleteADeveloper } = require('../controller/developerController');
const { getRestaurator, getARestaurator, createARestaurator, updateARestaurator, deleteARestaurator } = require('../controller/restauratorController');
const { getASponsorOfAProfile, getSponsoredProfile, createASponsorship, removeASponsorship } = require("../controller/sponsorshipController");
const { createARole, getARole } = require("../controller/roleController");


router.route('/profile/').get(protect, getProfiles).post(registerUser);
router.route('/profile/:id').get(protect, getAProfile).put(protect, updateAProfile).delete(protect, deleteAProfile);
router.route('/profile/login').post(loginUser);

router.route('/profile/deliveryman/').get(protect, IsDeliveryman, getDeliveryman).post(createADeliveryman);
router.route('/profile/deliveryman/:id').get(protect, IsDeliveryman, getADeliveryman).put(protect, IsDeliveryman, updateADeliveryman).delete(protect, IsDeliveryman, deleteADeliveryman);

router.route('/profile/consumer/',).get(protect, IsConsumer, getConsumer).post(createAConsumer);
router.route('/profile/consumer/:id').get(protect, IsConsumer, getAConsumer).put(protect, IsConsumer, updateAConsumer).delete(protect, IsConsumer, deleteAConsumer);

router.route('/profile/developer/').get(protect, IsDeveloper, getDeveloper).post(createADeveloper);
router.route('/profile/developer/:id').get(protect, IsDeveloper, getADeveloper).put(protect, IsDeveloper, updateADeveloper).delete(protect, IsDeveloper, deleteADeveloper);

router.route('/profile/restaurator/').get(protect, IsRestaurator, getRestaurator).post(createARestaurator);
router.route('/profile/restaurator/:id').get(protect, IsRestaurator, getARestaurator).put(protect, IsRestaurator, updateARestaurator).delete(protect, IsRestaurator, deleteARestaurator);

router.route('/profile/sponsorship/sponsor/:id').get(protect, getASponsorOfAProfile);
router.route('/profile/sponsorship/sponsored/:id').get(protect, getSponsoredProfile);
router.route('/profile/sponsorship/').post(protect, createASponsorship).delete(protect, removeASponsorship);

router.route('/profile/role/').post(createARole);
router.route('/profile/role/:id').get(getARole);

module.exports = router;