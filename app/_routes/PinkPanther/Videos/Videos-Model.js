import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Required'] },
    url: { type: String, required: [true, 'Required'] },
    episode: { type: String },
    season: { type: String },
    likes: { type: String },
    source: { type: String, required: [true, 'Required'] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Pinkpanthervideos', VideoSchema);
