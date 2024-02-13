import express from "express";
import { createAppendix, deleteAppendix, getAppendixs, updateAppendix } from "./Appendix-Controller";

const appendixRoute = express
  .Router()
  .get("/", getAppendixs)
  .post("/", createAppendix)
  .put("/", updateAppendix)
  .delete("/", deleteAppendix);

export default appendixRoute;
// This is linked to JWT and auth user can only make changes
// The auth is to determine which roles can do what.
// const { protect, authorize } = require('../../middleware/authorisationHelper');

// router.route('/').get(getAppendixs).post(protect, authorize('staff', 'admin'), createAppendix);
