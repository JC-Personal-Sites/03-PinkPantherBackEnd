import bcrypt from "bcryptjs";
import Crypto from "crypto";
import type { Request } from "express";
import jwt, { type Secret } from "jsonwebtoken";
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
      enum: ["65e86cebf51a1dfb57fb9e26", "65e86cebf51a1dfb57fb9e25"],
      default: "65e86cebf51a1dfb57fb9e26",
    },
    role: { type: String, trim: true, enum: ["Visitor", "User"], default: "Visitor" },
    ableToEdit: { type: Boolean, default: false },
    logonData: {
      password: { type: String, minlength: 8, select: false, required: [true, "password is Missing"] },
      lastLogonDateTime: { type: Date },
      resetPasswordToken: { type: String },
      resetPasswordSent: { type: Date },
      resetPasswordExpires: { type: Date },
      lockedOut: { type: Boolean },
      lockedOutDateTime: { type: Date },
      numberOfFailedLogons: { type: Number },
    },
    createAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export interface I_RequestUser extends Request {
  user: {
    _id: string;
    id: number;
    slug: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    emailAddress: string;
    roleId: string;
    role: string;
    ableToEdit: boolean;
    logonData: {
      password: string;
      lastLogonDateTime: Date;
      numberOfFailedLogons: number;
      resetPasswordToken?: string;
      resetPasswordSent?: Date;
      resetPasswordExpires?: Date;
      lockedOut?: boolean;
      lockedOutDateTime?: Date;
    };
    createAt: Date;
    matchPassword?: (password: string) => {};
    getToken?: () => {};
    getUser?: () => {};
  };
  rateLimit?: {
    remaining?: number;
  };
}

// hash password and create slug
UserSchema.pre("save", async function (next) {
  this.slug = slugify(`${this.id} ${this.firstName} ${this.lastName}`, { lower: true });
  const salt = await bcrypt.genSalt(10);
  this.logonData.password = await bcrypt.hash(this.logonData.password, salt);
  next();
});

// create jwt and fingerprint
UserSchema.methods.getToken = function () {
  const userFingerprint = Crypto.randomBytes(64).toString("hex");
  const userFingerprintHash = Crypto.createHash("sha256").update(userFingerprint).digest("hex");
  const usercsrf = Crypto.randomBytes(64).toString("hex"); // CSRF is cross-site request forgery
  const usercsrfHash = Crypto.createHash("sha256").update(usercsrf).digest("hex");

  return {
    token: jwt.sign(
      {
        userId: this._id,
        userFingerPrint: userFingerprintHash,
        usercsrf: usercsrfHash,
        expiresIn: process.env.JWT_EXPIRYTIME,
      },
      process.env.JWT_SECRET as Secret
    ),
    fingerPrint: userFingerprint,
    csrf: usercsrf,
  };
};

// create jwt with User Details
UserSchema.methods.getUser = function () {
  return {
    _id: this._id,
    id: this.id,
    slug: this.slug,
    name: this.firstName + " " + this.lastName,
    emailAddress: this.emailAddress,
    roleId: this.roleId,
    role: this.role,
    ableToEdit: this.ableToEdit,
    createAt: this.createAt,
  };
};

// Match password
UserSchema.methods.matchPassword = async function (password: string) {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await bcrypt.compare(password, this.logonData.password);
};

export default model("Pinkpantherusers", UserSchema);
