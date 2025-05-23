import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts"; 

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
            .then((res) => res.json())
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
        return html`
            <div class="project-list">
                ${this.projects.map(this.renderProject)}
            </div>
        `;
    }

    static styles = [
        reset.styles,
        css`
            .project-list {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
            }

            wood-project {
                flex: 1 1 300px;
            }
        `,
    ];
}
