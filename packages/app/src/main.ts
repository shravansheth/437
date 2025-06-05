import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";
import { HomeViewElement } from "./views/home-view";
import { ProjectViewElement } from "./views/project-view";

const routes = [
  {
    path: "/app/projects/:slug",
    view: (params: Switch.Params) => html`
      <project-view slug=${params.slug}></project-view>
    `
  },
  {
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "wood:history", "wood:auth");
    }
  },
  "home-view": HomeViewElement,
  "project-view": ProjectViewElement
});