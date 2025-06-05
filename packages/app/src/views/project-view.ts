// project-view.ts
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class ProjectViewElement extends LitElement {
  @property() slug = "";

  render() {
    return html`<p>Project detail for: ${this.slug}</p>`;
  }
}