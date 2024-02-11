import express from 'express';
import getNavBars from './NavBar-Controller.js';

const navBarRoute = express.Router().get('/', getNavBars);

export default navBarRoute;
