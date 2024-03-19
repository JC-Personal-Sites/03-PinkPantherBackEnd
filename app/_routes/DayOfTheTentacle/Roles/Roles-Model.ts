import { Schema, model } from "mongoose";
import type { ObjectId } from "bson";

const RoleSchema = new Schema(
  {
    role: { type: String, required: [true, "role is Missing"] },
    navBarIds: [],
    ableToEdit: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

export type T_Roles = {
  _id: ObjectId;
  role: string;
  navBarIds: ObjectId[];
  ableToEdit: boolean;
};

export default model("Dayofthetentacleroles", RoleSchema);
