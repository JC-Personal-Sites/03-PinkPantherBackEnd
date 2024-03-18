import express from "express";
import rateLimit from "express-rate-limit";

import { protect } from "../_localHelpers/authorisationHelper";
import { approveReset, forgotPassword, login, loggedIn, logout, resetPassword } from "./Authentication-Controller";

const apiLimited = rateLimit({
  windowMs: 15000, // 15 minutes
  max: 6,
});

const authenticationRoute = express
  .Router()
  .post("/login", apiLimited, login)
  .post("/loggedIn", protect, loggedIn)
  .post("/logout", logout)
  .post("/forgotPassword", forgotPassword)
  .post("/approveReset", protect, approveReset)
  .post("/resetPassword", protect, resetPassword);

export default authenticationRoute;
