import express from "express";

import { protect } from "../_localHelpers/authorisationHelper";
import { createUser, deleteUser, getUsers, updateUser } from "./Users-Controller";

const userRoute = express
  .Router()
  .get("/", protect, getUsers)
  .post("/", createUser)
  .put("/", protect, updateUser)
  .delete("/", protect, deleteUser);

export default userRoute;
