import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

interface Project {
  _id: string;
  title: string;
  submitter: string;
  tools: string[];
  description: string;
  slug: string;
  href: string;
}

@customElement("home-view")
export class HomeViewElement extends LitElement {
  @state()
  projects: Project[] = [];

  connectedCallback() {
  super.connectedCallback();
  const token = localStorage.getItem("token");

  fetch("/api/projects", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    })
    .then(data => this.projects = data)
    .catch(err => console.error("Failed to fetch projects:", err));
}

  render() {
    return html`
      <section class="intro">
        <h2>Welcome to Woodworking Hub</h2>
        <p>Browse woodworking projects, discover new ideas, and post your own builds to inspire others.</p>
      </section>

      <section class="featured-projects">
        <h2>Featured Projects</h2>
        ${this.projects.map(p => html`
          <wood-project
            title=${p.title}
            submitter=${p.submitter}
            tools=${p.tools}
            description=${p.description}
            href="/app/project/${p._id}">
          </wood-project>
        `)}
      </section>
    `;
  }
}