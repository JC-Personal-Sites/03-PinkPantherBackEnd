const express = require('express');
const { getAbout, getHistory } = require('./Wikipedia-Controller');
const router = express.Router();

router.route('/about').get(getAbout)

router.route('/history').get(getHistory)

module.exports = router;
