const express = require('express');
const { getPictures } = require('./Pictures-Controller');
const router = express.Router();

router.route('/').get(getPictures)

module.exports = router;
