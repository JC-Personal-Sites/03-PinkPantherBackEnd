import express from "express";

import getPictures from "./Pictures-Controller";

const ppPictureRoute = express.Router().get("/", getPictures);

export default ppPictureRoute;
