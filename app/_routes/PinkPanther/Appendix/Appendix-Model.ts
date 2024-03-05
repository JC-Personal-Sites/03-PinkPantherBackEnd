import { Schema, model } from "mongoose";
import slugify from "slugify";

const AppendixSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    slug: { type: String },
    reference: { type: String, required: [true, "reference is Missing"] },
    link: { type: String },
    comments: { type: String },
    type: { type: String, required: [true, "type is Missing"] },
    topic: { type: String, required: [true, "topic is Missing"] },
  },
  {
    versionKey: false,
  }
);

AppendixSchema.pre("save", function (next) {
  this.slug = slugify(`${this.id} ${this.reference}`, { lower: true });
  next();
});

export default model("Pinkpantherappendixs", AppendixSchema);
