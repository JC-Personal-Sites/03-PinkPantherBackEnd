import express from 'express';
import { getAbout, getHistory } from './Wikipedia-Controller';
const router = express.Router();

router.route('/about').get(getAbout);

router.route('/history').get(getHistory);

module.exports = router;
