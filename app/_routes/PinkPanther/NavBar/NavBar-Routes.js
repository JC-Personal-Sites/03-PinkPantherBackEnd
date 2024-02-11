import express from 'express';
import getNavBars from './NavBar-Controller.js';

export const navBarRoute = express.Router().get('/', getNavBars);

export default navBarRoute;
