import express from "express";

import { protect } from "../_localHelpers/authorisationHelper";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./Users-Controller";

const userRoute = express
  .Router()
  .get("/", getUsers)
  .post("/", createUser)
  .get("/", protect, getUser) // Need to think this one through as going to need a different path
  .put("/", protect, updateUser)
  .delete("/", protect, deleteUser);

export default userRoute;
