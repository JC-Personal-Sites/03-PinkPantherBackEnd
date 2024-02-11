import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
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

export default mongoose.model('Pinkpantherusers', UserSchema);
