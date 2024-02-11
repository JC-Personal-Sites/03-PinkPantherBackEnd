import mongoose from 'mongoose';

const NavBarSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: [true, 'Required'] },
    link: { type: String, required: [true, 'Required'] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Pinkpanthernavbars', NavBarSchema);
