import express from "express";
import rateLimit from "express-rate-limit";

import { approveReset, forgotPassword, login, logout, resetPassword } from "./Authentication-Controller";

const apiLimited = rateLimit({
  windowMs: 15000, // 15 minutes
  max: 6,
});

const authenticationRoute = express
  .Router()
  .post("/login", apiLimited, login)
  .post("/logout", logout)
  .post("/forgotPassword", forgotPassword)
  .post("/approveReset", approveReset)
  .post("/resetPassword", resetPassword);

export default authenticationRoute;
