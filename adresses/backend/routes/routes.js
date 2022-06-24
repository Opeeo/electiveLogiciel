const express = require('express');
const router = express.Router();

const { getAdresses, getAnAdress, creatAnAdress, updateAnAdress, deleteAnAdress } = require('../controller/adressController');

const { getAdressesByProfile, getProfilesByAdress, giveAnAdress, removeAnAdress } = require("../controller/giveAdressController");

router.route('/adress/').get(getAdresses).post(creatAnAdress);
router.route('/adress/:id').get(getAnAdress).put(updateAnAdress).delete(deleteAnAdress);

router.route('/adressesOfProfile/profile/:id').get(getAdressesByProfile);
router.route('/adressesOfProfile/adress/:id').get(getProfilesByAdress);
router.route('/adressesOfProfile/').post(giveAnAdress).delete(removeAnAdress);


module.exports = router;