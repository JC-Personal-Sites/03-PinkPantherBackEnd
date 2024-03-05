import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Required"] },
    lastName: { type: String, required: [true, "Required"] },
    phoneNumber: { type: String },
    emailAddress: { type: String, unique: true, required: [true, "Required"] },
    job: { type: String },
    type: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpantherusers", UserSchema);
