// models/Project.js
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  agent: { type: String, required: true },   // e.g. "Project Manager"
  feedback: { type: String, required: true } // their response
});

const JudgeSchema = new mongoose.Schema({
  refinedSpec: {
    title: { type: String },
    summary: { type: String },
    features: { type: [String], default: [] },
    acceptanceCriteria: { type: [String], default: [] },
    nonFunctional: {
      performance: { type: String },
      security: { type: String },
      scalability: { type: String },
      usability: { type: String },
      reliability: { type: String }
    },
    scope: {
      inScope: { type: [String] },
      outOfScope: { type: [String] }
    },
    milestones: { type: [String] }
  },
  changeLog: { type: [String], default: [] },
  risks: { type: [String], default: [] },
  consensusMap: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String }, // optional (could be "E-commerce App")
  slug: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId},
  requirement: { type: String, required: true },
  feedback: [FeedbackSchema],
  judge: JudgeSchema,
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;