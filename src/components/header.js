import { LitElement, html, css } from "lit";
import "./nav";

class C_Header extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 100%;
        }
        header {
          max-width: 100%;
          min-height: 230px;
          background-size: cover;
        }
      `,
    ];
  }
  static get properties() {
    return {
      url: { type: String },
    };
  }

  constructor() {
    super();
    this.url = "";
  }

  firstUpdated() {}

  render() {
    return html`
      <header style="background-image:url(${this.url});">
        <slot></slot>
      </header>
    `;
  }
  _btnHandler(e) {
    console.log(e.target);
  }
}

customElements.define("c-header", C_Header);
