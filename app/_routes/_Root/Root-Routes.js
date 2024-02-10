import express from 'express';
import { getRoot } from './Root-Controller';

const router = express.Router();

router.route('/').get(getRoot);

export default router;
