import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./Users-Controller";

import { protect } from "../_localHelpers/authorisationHelper";

const userRoute = express
  .Router()
  .get("/", protect, getUsers)
  .post("/", protect, createUser)
  .get("/", protect, getUser) // Need to think this one through as going to need a different path
  .put("/", protect, updateUser)
  .delete("/", protect, deleteUser);

export default userRoute;
