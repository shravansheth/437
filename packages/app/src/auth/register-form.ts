import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class RegisterFormElement extends LitElement {
  @property() api: string = "/auth/register";
  @property() redirect: string = "/login.html";
  @state() error?: string;
  @state() formData = { username: "", password: "" };

  static styles = css`
    .error { color: red; }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit} @input=${this.handleInput}>
        <input name="username" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.formData = { ...this.formData, [input.name]: input.value };
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();

    fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Registration failed");
        window.location.href = this.redirect;
      })
      .catch((err) => (this.error = err.message));
  };
}