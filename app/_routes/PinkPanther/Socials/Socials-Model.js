import mongoose from 'mongoose';

const SocialsSchema = new mongoose.Schema(
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

export default mongoose.model('Pinkpanthersocials', SocialsSchema);
