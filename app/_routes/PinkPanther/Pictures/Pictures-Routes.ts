import express from "express";

import getPictures from "./Pictures-Controller";

const pictureRoute = express.Router().get("/", getPictures);

export default pictureRoute;
