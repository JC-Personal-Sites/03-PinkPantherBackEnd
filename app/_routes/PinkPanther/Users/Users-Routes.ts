import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./Users-Controller";

const userRoute = express
  .Router()
  .get("/", getUsers)
  .post("/", createUser)
  .get("/", getUser) // Need to think this one through as going to need a different path
  .put("/", updateUser)
  .delete("/", deleteUser);

export default userRoute;
