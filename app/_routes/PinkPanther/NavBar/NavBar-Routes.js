import express from 'express';
import { getNavBars } from './NavBar-Controller';
const router = express.Router();

router.route('/').get(getNavBars);

module.exports = router;
