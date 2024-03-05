import { Schema, model } from "mongoose";

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

export default model("Pinkpanthernavbars", NavBarSchema);
