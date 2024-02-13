import { Schema, model } from "mongoose";

const PictureSchema = new Schema(
  {
    title: { type: String, required: [true, "Required"] },
    url: { type: String, required: [true, "Required"] },
    source: { type: String, required: [true, "Required"] },
    comments: { type: String },
    likes: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpantherpictures", PictureSchema);
