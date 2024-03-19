import express from "express";

import getSocials from "./Socials-Controller";

const ppSocialsRoute = express.Router().get("/", getSocials);

export default ppSocialsRoute;
