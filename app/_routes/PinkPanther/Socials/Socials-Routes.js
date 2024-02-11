import express from 'express';
import getSocials from './Socials-Controller.js';

export const socialsRoute = express.Router().get('/', getSocials);

export default socialsRoute;
