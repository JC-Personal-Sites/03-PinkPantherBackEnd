import express from "express";
import getVideos from "./Videos-Controller";

const videoRoute = express.Router().get("/", getVideos);

export default videoRoute;
