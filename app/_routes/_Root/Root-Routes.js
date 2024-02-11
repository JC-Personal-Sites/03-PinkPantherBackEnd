import express from 'express';
import getRoot from './Root-Controller.js';

const rootRoute = express.Router().get('/', getRoot);

export default rootRoute;
