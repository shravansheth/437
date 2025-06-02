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

function create(json: Project): Promise<Project> {
  const p = new ProjectModel(json);
  return p.save();
}

function update(slug: string, project: Project): Promise<Project> {
  return ProjectModel.findOneAndUpdate({ slug }, project, { new: true }).then((updated) => {
    if (!updated) throw `${slug} not updated`;
    return updated;
  });
}

function remove(slug: string): Promise<void> {
  return ProjectModel.findOneAndDelete({ slug }).then((deleted) => {
    if (!deleted) throw `${slug} not deleted`;
  });
}

export default { index, get, create, update, remove };