import express from "express";
import getSocials from "./Socials-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const socialsRoute = express.Router().get("/", protect, getSocials);

export default socialsRoute;
