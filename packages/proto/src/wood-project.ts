import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class WoodProjectElement extends LitElement {
  @property() title = "";
  @property() description = "";
  @property() submitter = "";
  @property() tools = "";

  override render() {
    return html`
      <div class="card">
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <p>Submitted by ${this.submitter}</p>
        <p>Tools: ${this.tools}</p>
      </div>
    `;
  }

  static styles = css`
    .card {
      background: white;
      border: 1px solid var(--color-border);
      padding: var(--spacing-md);
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  `;
}