import express from "express";

import getVideos from "./Videos-Controller";

const dottVideoRoute = express.Router().get("/", getVideos);

export default dottVideoRoute;
