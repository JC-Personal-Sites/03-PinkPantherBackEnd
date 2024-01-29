const express = require('express');
const { getPictures } = require('./Picture-Controller');
const router = express.Router();

router.route('/').get(getPictures)

module.exports = router;
