import { Schema, model } from "mongoose";
import slugify from "slugify";

const SocialsSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    slug: { type: String },
    social: { type: String, unique: true, required: [true, "social is Missing"] },
    icon: { type: String, unique: true, required: [true, "icon is Missing"] },
    link: { type: String, unique: true, required: [true, "link is Missing"] },
  },
  {
    versionKey: false,
  }
);

SocialsSchema.pre("save", function (next) {
  this.slug = slugify(`${this.id} ${this.social}`, { lower: true });
  next();
});

export default model("Dayofthetentaclesocials", SocialsSchema);
