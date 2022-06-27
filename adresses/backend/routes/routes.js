const express = require('express');
const router = express.Router();

const { getAdresses, getAnAdress, creatAnAdress, updateAnAdress, deleteAnAdress } = require('../controller/adressController');

const { getAdressesByProfile, getProfilesByAdress, giveAnAdress, removeAnAdress } = require("../controller/giveAdressController");

router.route('/adress/').get(getAdresses).post(creatAnAdress);
router.route('/adress/:id').get(getAnAdress).put(updateAnAdress).delete(deleteAnAdress);

router.route('/adress/profile/:id').get(getAdressesByProfile);
router.route('/adress/profile/').post(giveAnAdress).delete(removeAnAdress);


module.exports = router;