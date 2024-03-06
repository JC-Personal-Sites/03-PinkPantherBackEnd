import mongoose, { Schema, model } from "mongoose";
import slugify from "slugify";

const UserSchema = new Schema(
  {
    id: { type: Number, unique: true, required: [true, "id is Missing"] },
    slug: { type: String },
    firstName: { type: String, required: [true, "firstName is Missing"] },
    lastName: { type: String, required: [true, "lastName is Missing"] },
    phoneNumber: { type: String },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "emailAddress is Missing"],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      enum: ["65e86cebf51a1dfb57fb9e25", "65e86cebf51a1dfb57fb9e26"],
      default: "65e86cebf51a1dfb57fb9e26",
    },
    role: { type: String, enum: ["visitor", "user"], default: "visitor" },
    logonData: {
      password: { type: String },
      lastLogonDateTime: { type: Date },
      resetPasswordToken: { type: String },
      resetPasswordSent: { type: Date },
      resetPasswordExpires: { type: Date },
      lockedOut: { type: Boolean },
      lockedOutDateTime: { type: Date },
      roleId: { type: mongoose.Types.ObjectId },
      roleName: { type: String, enum: ["User", "Visitor"], default: "visitor" },
      numberOfFailedLogons: { type: Number },
    },
    createAt: { type: Date, default: Date.now },
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
