import express from "express";
import { createRole, deleteRole, getRoles, updateRole } from "./Roles-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const roleRoute = express
  .Router()
  .get("/", protect, getRoles)
  .post("/", protect, createRole)
  .put("/", protect, updateRole)
  .delete("/", protect, deleteRole);

export default roleRoute;
