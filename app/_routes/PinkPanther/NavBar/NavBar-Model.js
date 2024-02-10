import mongoose from 'mongoose';

export const NavBarSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: [true, 'Required'] },
    link: { type: String, required: [true, 'Required'] },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Pinkpanthernavbars', NavBarSchema);
