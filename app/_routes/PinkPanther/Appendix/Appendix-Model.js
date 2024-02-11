import mongoose from 'mongoose';

const AppendixSchema = new mongoose.Schema(
  {
    id: { type: Number },
    reference: { type: String, required: [true, 'Required'] },
    link: { type: String },
    comments: { type: String },
    type: { type: String, required: [true, 'Required'] },
    topic: { type: String, required: [true, 'Required'] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Pinkpantherappendixs', AppendixSchema);
