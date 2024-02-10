import mongoose from 'mongoose';

export const SocialsSchema = new mongoose.Schema(
  {
    id: { type: Number },
    social: { type: String },
    icon: { type: String, required: [true, 'Required'] },
    link: { type: String, required: [true, 'Required'] },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Pinkpanthersocials', SocialsSchema);
