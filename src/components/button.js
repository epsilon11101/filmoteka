import { LitElement, html, css } from "lit";

class C_Button extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }
        button {
          background-color: var(--btn-color, transparent);
          min-width: var(--btn-width, 130.19px);
          min-height: var(--btn-height, 44px);
          border-radius: 5px;
          color: white;
          border: solid 1px white;
        }
        button:hover {
          background-color: var(--h_btn-color, #ff6b08);
          cursor: pointer;
        }
      `,
    ];
  }

  static properties = {
    title: { type: String },
  };

  constructor() {
    super();
    this.title = "";
  }

  render() {
    return html` <button>${this.title}</button> `;
  }
}

customElements.define("c-button", C_Button);
