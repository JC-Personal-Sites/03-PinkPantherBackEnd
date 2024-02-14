import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String },
    job: { type: String },
    type: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpantherusers", UserSchema);
