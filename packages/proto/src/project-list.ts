import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface Project {
  title: string;
  submitter: string;
  tools: string;
  description: string;
  href: string;
}

@customElement("project-list")
export class ProjectListElement extends LitElement {
  @property()
  src?: string;

  @state()
  projects: Project[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  hydrate(src: string) {
    fetch(src)
      .then(res => res.json())
      .then((json: object) => {
        if (Array.isArray(json)) {
          this.projects = json as Project[];
        }
      });
  }

  renderProject(p: Project) {
    return html`
      <wood-project
        title="${p.title}"
        submitter="${p.submitter}"
        description="${p.description}"
        href="${p.href}"
      ></wood-project>
    `;
  }

  render() {
    return html` ${this.projects.map(this.renderProject)} `;
  }
}