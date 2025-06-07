import express, { Request, Response } from "express";
import { Project } from "../models/project";
import Projects from "../services/project-svc";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  Projects.index()
    .then((list: Project[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// Get one project by slug
// router.get("/:slug", (req: Request, res: Response) => {
//   const { slug } = req.params;
//   Projects.get(slug)
//     .then((project: Project | null) => {
//       if (project) res.json(project);
//       else res.status(404).end();
//     })
//     .catch((err) => res.status(500).send(err));
// });

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const project = await Project.findOne({ slug });
    if (!project) return res.status(404).send("Project not found");
    res.json(project);
  } catch (err) {
    res.status(500).send("Error fetching project");
  }
});

router.post("/", (req: Request, res: Response) => {
  const newProject = req.body;

  Projects.create(newProject)
    .then((project: Project) => res.status(201).json(project))
    .catch((err) => res.status(500).send(err));
});

router.put("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  const newProject = req.body;

  Projects.update(slug, newProject)
    .then((project: Project) => res.json(project))
    .catch(() => res.status(404).end());
});

router.delete("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;

  Projects.remove(slug)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;