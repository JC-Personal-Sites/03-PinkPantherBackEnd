import express from "express";
import { createRole, deleteRole, getRoles, updateRole } from "./Roles-Controller";

const roleRoute = express
  .Router()
  .get("/", getRoles)
  .post("/", createRole)
  .put("/", updateRole)
  .delete("/", deleteRole);

export default roleRoute;
