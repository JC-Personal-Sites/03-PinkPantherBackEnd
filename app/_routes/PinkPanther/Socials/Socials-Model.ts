import { Schema, model } from "mongoose";

const SocialsSchema = new Schema(
  {
    id: { type: Number },
    social: { type: String },
    icon: { type: String, required: [true, "Required"] },
    link: { type: String, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpanthersocials", SocialsSchema);
