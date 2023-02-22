const express = require('express');
const { getPictures, getPicture, createPicture, updatePicture, deletePicture } = require('./Picture-Controller');
const router = express.Router();

router.route('/').get(getPictures).post(createPicture);
router.route('/:id').get(getPicture).put(updatePicture).delete(deletePicture);

module.exports = router;
