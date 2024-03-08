import express from "express";

import getSocials from "./Socials-Controller";

const socialsRoute = express.Router().get("/", getSocials);

export default socialsRoute;
