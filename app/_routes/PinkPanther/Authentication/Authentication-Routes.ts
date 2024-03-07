import express from "express";
import rateLimit from "express-rate-limit";
import { approveReset, forgotPassword, login, register, resetPassword } from "./Authentication-Controller";

const apiLimited = rateLimit({
  windowMs: 15000, // 15 minutes
  max: 6,
});

const authenticationRoute = express
  .Router()
  .post("/register", register)
  .post("/login", apiLimited, login)
  .post("/forgotPassword", forgotPassword)
  .post("/approveReset", approveReset)
  .post("/resetPassword", resetPassword);

export default authenticationRoute;
