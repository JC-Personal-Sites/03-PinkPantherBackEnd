const express = require('express');
const { getNavBars } = require('./NavBar-Controller');
const router = express.Router();

router.route('/').get(getNavBars)

module.exports = router;
