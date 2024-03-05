import { Schema, model } from "mongoose";

const SocialsSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "Required"] },
    social: { type: String, unique: true, required: [true, "Required"] },
    icon: { type: String, unique: true, required: [true, "Required"] },
    link: { type: String, unique: true, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpanthersocials", SocialsSchema);
