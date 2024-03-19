import express from "express";

import getPictures from "./Pictures-Controller";

const dottPictureRoute = express.Router().get("/", getPictures);

export default dottPictureRoute;
