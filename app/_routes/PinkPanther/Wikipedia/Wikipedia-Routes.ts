import express from "express";
import { getAbout, getHistory } from "./Wikipedia-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const wikipediaRoute = express.Router().get("/about", protect, getAbout).get("/history", protect, getHistory);

export default wikipediaRoute;
