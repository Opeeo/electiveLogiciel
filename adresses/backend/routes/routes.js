const express = require('express');
const router = express.Router();

const { getAdresses, getAnAdress, creatAnAdress, updateAnAdress, deleteAnAdress } = require('../controller/adressController');

const { getAdressesByProfile, giveAnAdress, removeAnAdress } = require("../controller/giveAdressController");

const { protect, IsConsumer, IsDeliveryman, IsDeveloper, IsRestaurator } = require('../middleware/authMiddleware')

router.route('/adress/').get(protect, getAdresses).post(protect, creatAnAdress);
router.route('/adress/:id').get(protect, getAnAdress).put(protect, updateAnAdress).delete(protect, deleteAnAdress);

router.route('/adress/profile/:id').get(protect, getAdressesByProfile);
router.route('/adress/profile/').post(protect, giveAnAdress).delete(protect, removeAnAdress);


module.exports = router;