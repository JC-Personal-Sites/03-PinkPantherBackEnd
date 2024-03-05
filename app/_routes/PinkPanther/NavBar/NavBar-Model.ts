import { Schema, model } from "mongoose";

const NavBarSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "Required"] },
    title: { type: String, unique: true, required: [true, "Required"] },
    link: { type: String, unique: true, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpanthernavbars", NavBarSchema);
