import express from "express";

import { getAbout, getHistory } from "./Wikipedia-Controller";

const wikipediaRoute = express.Router().get("/about", getAbout).get("/history", getHistory);

export default wikipediaRoute;
