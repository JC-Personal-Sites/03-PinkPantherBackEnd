import express from 'express';
import { getVideos } from './Videos-Controller';
const router = express.Router();

router.route('/').get(getVideos);

module.exports = router;
