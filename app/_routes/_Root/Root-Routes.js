import express from 'express';
import getRoot from './Root-Controller.js';

export const rootRoute = express.Router().get('/', getRoot);

export default rootRoute;
