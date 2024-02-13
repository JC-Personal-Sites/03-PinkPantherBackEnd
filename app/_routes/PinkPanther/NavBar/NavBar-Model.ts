import { Schema, model } from "mongoose";

const NavBarSchema = new Schema(
  {
    id: { type: Number },
    title: { type: String, required: [true, "Required"] },
    link: { type: String, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpanthernavbars", NavBarSchema);
