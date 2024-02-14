import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./Users-Controller";

const userRoute = express
  .Router()
  .get("/", getUsers)
  .post("/", createUser)
  .get("/:id", getUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export default userRoute;
