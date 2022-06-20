const express = require('express');
const router = express.Router();

const { getUsers } = require('../controller/controller');

router.route('/user/').get(getUsers);

module.exports = router;