import express from "express";
import getVideos from "./Videos-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const videoRoute = express.Router().get("/", protect, getVideos);

export default videoRoute;
