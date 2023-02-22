const express = require('express');
const { getVideos, getVideo, createVideo, updateVideo, deleteVideo } = require('./Video-Controller');
const router = express.Router();

router.route('/').get(getVideos).post(createVideo);
router.route('/:id').get(getVideo).put(updateVideo).delete(deleteVideo);

module.exports = router;
