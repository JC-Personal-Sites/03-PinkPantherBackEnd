import express from "express";

import getNavBars from "./NavBar-Controller";

const ppNavBarRoute = express.Router().get("/", getNavBars);

export default ppNavBarRoute;
