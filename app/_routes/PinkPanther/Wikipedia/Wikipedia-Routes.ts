import express from "express";

import { getAbout, getHistory } from "./Wikipedia-Controller";

const ppWikipediaRoute = express.Router().get("/about", getAbout).get("/history", getHistory);

export default ppWikipediaRoute;
