import express from "express";
import rateLimit from "express-rate-limit";
import {
  approveResetAuth,
  forgotPasswordAuth,
  loginAuth,
  registerAuth,
  resetPasswordAuth,
} from "./Authentication-Controller";

const apiLimited = rateLimit({
  windowMs: 15000, // 15 minutes
  max: 6,
});

const authenticationRoute = express
  .Router()
  .post("/register", registerAuth)
  .post("/login", apiLimited, loginAuth)
  .post("/forgotPassword", forgotPasswordAuth)
  .post("/approveReset", approveResetAuth)
  .post("/resetPassword", resetPasswordAuth);

export default authenticationRoute;
