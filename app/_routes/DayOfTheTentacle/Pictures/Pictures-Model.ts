import { Schema, model } from "mongoose";
import slugify from "slugify";

const PictureSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    slug: { type: String },
    title: { type: String, unique: true, required: [true, "title is Missing"] },
    url: { type: String, unique: true, required: [true, "url is Missing"] },
    source: { type: String, required: [true, "source is Missing"] },
    comments: { type: String },
    likes: { type: String },
  },
  {
    versionKey: false,
  }
);

PictureSchema.pre("save", function (next) {
  this.slug = slugify(`${this.id} ${this.title}`, { lower: true });
  next();
});

export default model("Dayofthetentaclepictures", PictureSchema);
