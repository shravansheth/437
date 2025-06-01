import { Schema, model } from "mongoose";
import { Project } from "../models/project";

const ProjectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    submitter: { type: String, required: true },
    tools: [String],
    description: String,
    href: String
  },
  { collection: "projects" }
);

const ProjectModel = model<Project>("Project", ProjectSchema);

function index(): Promise<Project[]> {
  return ProjectModel.find();
}

function get(slug: string): Promise<Project | null> {
  return ProjectModel.findOne({ slug });
}

export default { index, get };