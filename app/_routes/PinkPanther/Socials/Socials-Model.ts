import { Schema, model } from "mongoose";

const SocialsSchema = new Schema(
  {
    id: { type: Number, required: [true, "Required"] },
    social: { type: String, required: [true, "Required"] },
    icon: { type: String, required: [true, "Required"] },
    link: { type: String, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpanthersocials", SocialsSchema);
