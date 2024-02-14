import { Schema, model } from "mongoose";

const AppendixSchema = new Schema(
  {
    id: { type: Number },
    reference: { type: String, required: [true, "Required"] },
    link: { type: String },
    comments: { type: String },
    type: { type: String, required: [true, "Required"] },
    topic: { type: String, required: [true, "Required"] },
  },
  {
    versionKey: false,
  }
);

export default model("Pinkpantherappendixs", AppendixSchema);
