import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    body: { type: String },
    language: { type: String, default: "javascript" },
    code: { type: String },
    tags: { type: [String], default: [] },
    isSaved: { type: Boolean, default: false },
    isTrash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Snippet =
  mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);
export default Snippet;
