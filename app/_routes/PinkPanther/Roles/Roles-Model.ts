import { Schema, model } from "mongoose";

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

export default model("Pinkpantherroles", RoleSchema);
