const express = require('express');
const { getSocials } = require('./Socials-Controller');
const router = express.Router();

router.route('/').get(getSocials)

module.exports = router;
