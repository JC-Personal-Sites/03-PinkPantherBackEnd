import express from 'express';
import getPictures from './Pictures-Controller.js';

export const pictureRoute = express.Router().get('/', getPictures);

export default pictureRoute;
