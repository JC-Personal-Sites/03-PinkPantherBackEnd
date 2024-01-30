const express = require('express');
const { getVideos } = require('./Video-Controller');
const router = express.Router();

router.route('/').get(getVideos)

module.exports = router;
