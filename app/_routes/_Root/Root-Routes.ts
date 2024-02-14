import express from "express";
import getRoot from "./Root-Controller";

const rootRoute = express.Router().get("/", getRoot);

export default rootRoute;
