import express from 'express';
import { getPictures } from './Pictures-Controller';
const router = express.Router();

router.route('/').get(getPictures);

module.exports = router;
