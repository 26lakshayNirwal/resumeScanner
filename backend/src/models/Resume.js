import mongoose from "mongoose";

/**
 * Resume Schema
 * Stores metadata and extracted information for uploaded resumes.
 */
const resumeSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  extractedData: {
    type: Object, // Stores parsed resume data (skills, experience, etc.)
    default: {}
  }
}, { 
  timestamps: true // Automatically manage createdAt and updatedAt
});

export default mongoose.model("Resume", resumeSchema);
