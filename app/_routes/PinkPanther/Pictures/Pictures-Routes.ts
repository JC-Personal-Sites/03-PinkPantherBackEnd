import express from "express";
import getPictures from "./Pictures-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const pictureRoute = express.Router().get("/", protect, getPictures);

export default pictureRoute;
