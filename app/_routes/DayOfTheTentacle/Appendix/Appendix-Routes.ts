import express from "express";
import { createAppendix, deleteAppendix, getAppendixs, updateAppendix } from "./Appendix-Controller";

import { protect, authorizedRoles } from "../_localHelpers/authorisationHelper";

const dottAppendixRoute = express
  .Router()
  .get("/", getAppendixs)
  .post("/", protect, authorizedRoles("Admin", "Visitor"), createAppendix)
  .put("/", protect, authorizedRoles("Admin", "Visitor"), updateAppendix)
  .delete("/", protect, authorizedRoles("Admin", "Visitor"), deleteAppendix);

export default dottAppendixRoute;
