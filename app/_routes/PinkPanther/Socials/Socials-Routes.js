import express from 'express';
import { getSocials } from './Socials-Controller';
const router = express.Router();

router.route('/').get(getSocials);

module.exports = router;
