import express from "express";

import getSocials from "./Socials-Controller";

const dottSocialsRoute = express.Router().get("/", getSocials);

export default dottSocialsRoute;
