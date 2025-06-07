import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts"; 

export class WoodProjectElement extends LitElement {
  @property() href = "#";
  @property() title = "";
  @property() description = "";
  @property() submitter = "";
  @property() tools = "";

  override render() {
    return html`
      <div class="card">
        <h3><a href="${this.href}">${this.title}</a></h3>
        <p>${this.description}</p>
        <p>Submitted by ${this.submitter}</p>
      </div>
    `;
  }

  static styles = [
  reset.styles,
  css`
    :host {
      display: block;
      background-color: var(--color-background-card, #fff);
      color: var(--color-text, #000);
      border: 1px solid var(--color-accent, #ccc);
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 0.5rem 0;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }

    p {
      margin-bottom: 0.25rem;
    }

    a {
    color: var(--color-link);
    text-decoration: none;
    }

    a:hover {
    color: var(--color-link-hover);
    }
  `
];
}