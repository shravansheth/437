"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var project_svc_exports = {};
__export(project_svc_exports, {
  default: () => project_svc_default
});
module.exports = __toCommonJS(project_svc_exports);
var import_mongoose = require("mongoose");
const ProjectSchema = new import_mongoose.Schema(
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
const ProjectModel = (0, import_mongoose.model)("Project", ProjectSchema);
function index() {
  return ProjectModel.find();
}
function get(slug) {
  return ProjectModel.findOne({ slug });
}
var project_svc_default = { index, get };
