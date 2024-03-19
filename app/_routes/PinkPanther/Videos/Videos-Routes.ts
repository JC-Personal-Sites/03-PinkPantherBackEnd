import express from "express";

import getVideos from "./Videos-Controller";

const ppVideoRoute = express.Router().get("/", getVideos);

export default ppVideoRoute;
