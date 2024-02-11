import express from 'express';
import getVideos from './Videos-Controller.js';

export const videoRoute = express.Router().get('/', getVideos);

export default videoRoute;
