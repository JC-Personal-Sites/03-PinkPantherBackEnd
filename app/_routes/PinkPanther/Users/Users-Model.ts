import bcrypt from "bcryptjs";
import Crypto from "crypto";
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

  return {
    token: jwt.sign(
      {
        userId: this._id,
        user: `${this.firstName} ${this.lastName}`,
        userRoleId: this.roleId,
        userRole: this.role,
        ableToEdit: this.ableToEdit,
        userFingerPrint: userFingerprintHash,
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXPIRYTIME }
    ),
    fingerPrint: userFingerprint,
  };
};

// Match password
UserSchema.methods.matchPassword = async function (password: string) {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await bcrypt.compare(password, this.logonData.password);
};

export default model("Pinkpantherusers", UserSchema);
