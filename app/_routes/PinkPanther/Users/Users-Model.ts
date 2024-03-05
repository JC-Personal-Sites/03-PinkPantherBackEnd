import { Schema, model } from "mongoose";
import slugify from "slugify";

const UserSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    slug: { type: String },
    firstName: { type: String, required: [true, "firstName is Missing"] },
    lastName: { type: String, required: [true, "lastName is Missing"] },
    phoneNumber: { type: String },
    emailAddress: { type: String, unique: true, required: [true, "emailAddress is Missing"] },
    job: { type: String },
    type: { type: String },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre("save", function (next) {
  this.slug = slugify(`${this.id} ${this.firstName} ${this.lastName}`, { lower: true });
  next();
});

export default model("Pinkpantherusers", UserSchema);
