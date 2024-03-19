import express from "express";

import { protect } from "../_localHelpers/authorisationHelper";
import { createRole, deleteRole, getRoles, updateRole } from "./Roles-Controller";

const dottRoleRoute = express
  .Router()
  .get("/", getRoles)
  .post("/", protect, createRole)
  .put("/", protect, updateRole)
  .delete("/", protect, deleteRole);

export default dottRoleRoute;
