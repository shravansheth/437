import { html, css, LitElement } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { router } from "../../@calpoly/mustang";

interface Project {
  _id: string;
  title: string;
  submitter: string;
  tools: string[];
  materials: string[];
  description: string;
  comments: { user: string; text: string }[];
}

@customElement("project-view")
export class ProjectViewElement extends LitElement {
  @property({ type: String }) slug = "";
  @state() project?: Project;

  static styles = css`
    @import "/styles/reset.css";
    @import "/styles/page.css";

    ul {
      list-style: none;
      padding-left: 0;
    }

    .icon {
      width: 1em;
      height: 1em;
      margin-left: 0.5em;
    }

    .main-content {
      padding: 1rem;
    }

    h2 {
      margin-top: 1.5rem;
    }

    a {
      color: var(--color-link);
    }
  `;

  connectedCallback() {
  super.connectedCallback();
  const token = localStorage.getItem("token");

  fetch(`/api/projects/${this.slug}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch project");
      return res.json();
    })
    .then(data => (this.project = data))
    .catch(err => console.error("Failed to fetch project:", err));
}

  render() {
    if (!this.project) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <header class="site-header">
        <div class="logo">🪵</div>
        <h1>Woodworking Hub</h1>
        <nav class="site-nav">
          <a href="/app">Home</a>
          <a href="/app/projects">Projects</a>
          <a href="/app/materials">Materials</a>
          <a href="/app/profile">Profile</a>
        </nav>
        <label id="dark-toggle">
          <input type="checkbox" autocomplete="off" />
          Dark Mode
        </label>
      </header>

      <div class="grid-layout">
        <main class="main-content">
          <h1>${this.project.title}</h1>
          <p>Submitted by <a href="/app/user/${this.project.submitter}">${this.project.submitter}</a></p>

          <h2>Tools</h2>
          <ul>
            ${this.project.tools.map(tool => html`
              <li>
                ${tool}
                <svg class="icon">
                  <use href="/icons/tools.svg#icon-${tool.toLowerCase().replace(/\s+/g, '')}" />
                </svg>
              </li>
            `)}
          </ul>

          <h2>Materials</h2>
          <ul>
            ${this.project.materials?.map(material => html`
              <li>
                ${material}
                <svg class="icon">
                  <use href="/icons/tools.svg#icon-${material.toLowerCase().replace(/\s+/g, '')}" />
                </svg>
              </li>
            `)}
          </ul>

          <h2>Comments</h2>
          <ul>
            ${this.project.comments?.map(comment => html`
              <li>
                <strong>${comment.user}:</strong> ${comment.text}
              </li>
            `)}
          </ul>

          <a href="/app">← Back to Projects</a>
        </main>
      </div>
    `;
  }
}


export { ProjectViewElement };