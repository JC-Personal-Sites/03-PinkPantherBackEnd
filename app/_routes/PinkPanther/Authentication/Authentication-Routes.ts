import express from "express";
import {
  registerAuth,
  loginAuth,
  forgotPasswordAuth,
  approveResetAuth,
  resetPasswordAuth,
} from "./Authentication-Controller";

const authenticationRoute = express
  .Router()
  .post("/register", registerAuth)
  .post("/login", loginAuth)
  .post("/forgotPassword", forgotPasswordAuth)
  .post("/approveReset", approveResetAuth)
  .post("/resetPassword", resetPasswordAuth);

export default authenticationRoute;
