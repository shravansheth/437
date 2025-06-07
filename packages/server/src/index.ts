import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
connect("Woodworking");
//import projects from "./routes/projects";
import Projects from "./services/project-svc";
import auth, { authenticateUser } from "./routes/auth";
import projectRoutes from "./routes/projects"; 
import fs from "node:fs/promises";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);

app.use("/projects", authenticateUser, projectRoutes);
//app.use("/api/projects", projects);
app.use("/api/projects", projectRoutes);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/app/*", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, "utf-8").then((html) => res.send(html));
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

