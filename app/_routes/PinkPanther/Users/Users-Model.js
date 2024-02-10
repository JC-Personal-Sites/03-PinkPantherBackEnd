import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String },
    job: { type: String },
    type: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Pinkpantherusers', UserSchema);
