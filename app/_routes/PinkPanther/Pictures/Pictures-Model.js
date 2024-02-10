import mongoose from 'mongoose';

export const PictureSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Required'] },
    url: { type: String, required: [true, 'Required'] },
    source: { type: String, required: [true, 'Required'] },
    comments: { type: String },
    likes: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Pinkpantherpictures', PictureSchema);
