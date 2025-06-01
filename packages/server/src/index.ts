import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
connect("Woodworking");

import Projects from "./services/project-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/projects", (_req: Request, res: Response) => {
  Projects.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  });
});

app.get("/projects/:slug", (req: Request, res: Response) => {
  Projects.get(req.params.slug).then((project) => {
    if (project) {
      res.set("Content-Type", "application/json").send(JSON.stringify(project));
    } else {
      res.status(404).send();
    }
  });
});