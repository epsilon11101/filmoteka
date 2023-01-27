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
          width: var(--btn-width, 130.19px);
          min-height: var(--btn-height, 44px);
          border-radius: 5px;
          color: var(--btn-text_color, var(--white_primary));
          border: solid 1px var(--btn-border_color, var(--white_primary));
        }
        button:hover {
          color: var(--h_btn-text_color, var(--white_primary));
          background-color: var(--h_btn-color, var(--orange_primary));
          cursor: pointer;
        }
        @media screen and (min-width: 767px) {
          button {
            --btn-width: 136px;
          }
        }
        @media screen and (min-width: 1024px) {
          button {
            --btn-width: 136px;
          }
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
