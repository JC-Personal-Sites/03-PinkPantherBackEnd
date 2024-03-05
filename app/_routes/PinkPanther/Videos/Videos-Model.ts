import { Schema, model } from "mongoose";

const VideoSchema = new Schema(
  {
    title: { type: String, unique: true, required: [true, "Required"] },
    url: { type: String, unique: true, required: [true, "Required"] },
    episode: { type: String },
    season: { type: String },
    likes: { type: String },
    source: { type: String, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpanthervideos", VideoSchema);
