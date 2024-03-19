import express from "express";

import getNavBars from "./NavBar-Controller";

const dottNavBarRoute = express.Router().get("/", getNavBars);

export default dottNavBarRoute;
