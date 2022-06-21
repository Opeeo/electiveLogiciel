const express = require('express');
const router = express.Router();

const { getProfiles, getAProfile, creatAProfile, updateAProfile, deleteAProfile } = require('../controller/profileController');

router.route('/profile/').get(getProfiles).post(creatAProfile);
router.route('/profile/:id').get(getAProfile).put(updateAProfile).delete(deleteAProfile);

module.exports = router;