const express = require('express');
const { getRoot } = require('./Root-Controller');
const router = express.Router();

router.route('/').get(getRoot)

module.exports = router;
