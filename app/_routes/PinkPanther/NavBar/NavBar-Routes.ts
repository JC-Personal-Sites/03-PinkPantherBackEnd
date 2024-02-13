import express from "express";
import getNavBars from "./NavBar-Controller";

const navBarRoute = express.Router().get("/", getNavBars);

export default navBarRoute;
