import { Schema, model } from "mongoose";

const PictureSchema = new Schema(
  {
    title: { type: String, unique: true, required: [true, "Required"] },
    url: { type: String, unique: true, required: [true, "Required"] },
    source: { type: String, required: [true, "Required"] },
    comments: { type: String },
    likes: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpantherpictures", PictureSchema);
