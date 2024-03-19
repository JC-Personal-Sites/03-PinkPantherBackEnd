import express from "express";
import rateLimit from "express-rate-limit";

import { protect } from "../_localHelpers/authorisationHelper";
import { approveReset, forgotPassword, login, logout, resetPassword } from "./Authentication-Controller";

const apiLimited = rateLimit({
  windowMs: 15000, // 15 minutes
  max: 6,
});

const dottAuthenticationRoute = express
  .Router()
  .post("/login", apiLimited, login)
  .get("/logout", logout)
  .post("/forgotPassword", forgotPassword)
  .post("/approveReset", protect, approveReset)
  .post("/resetPassword", protect, resetPassword);

export default dottAuthenticationRoute;
