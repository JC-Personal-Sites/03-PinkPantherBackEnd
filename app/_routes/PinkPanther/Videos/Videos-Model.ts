import { Schema, model } from "mongoose";
import slugify from "slugify";

const VideoSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    slug: { type: String },
    title: { type: String, unique: true, required: [true, "title is Missing"] },
    url: { type: String, unique: true, required: [true, "url is Missing"] },
    episode: { type: String },
    season: { type: String },
    likes: { type: String },
    source: { type: String, required: [true, "source is Missing"] },
  },
  {
    versionKey: false,
  }
);

VideoSchema.pre("save", function (next) {
  this.slug = slugify(`${this.id} ${this.title}`, { lower: true });
  next();
});

export default model("Pinkpanthervideos", VideoSchema);
