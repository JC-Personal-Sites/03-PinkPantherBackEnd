import { Schema, model } from "mongoose";
import type { ObjectId } from "bson";

const NavBarSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    title: { type: String, unique: true, required: [true, "title is Missing"] },
    link: { type: String, unique: true, required: [true, "link is Missing"] },
  },
  {
    versionKey: false,
  }
);

export type T_NavBar = {
  _id: ObjectId;
  id: number;
  title: string;
  link: string;
};

export default model("Dayofthetentaclenavbars", NavBarSchema);
