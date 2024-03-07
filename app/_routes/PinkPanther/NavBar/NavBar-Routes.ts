import express from "express";
import getNavBars from "./NavBar-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const navBarRoute = express.Router().get("/", protect, getNavBars);

export default navBarRoute;
