import { LitElement, html, css } from "lit";

class C_Search extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          color: white;
          min-width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        input {
          min-width: var(--input-width, 50%);
          color: var(--white_primary);
          font-weight: var(--bold);
          font-size: 14px;
          outline: none;
          background-color: transparent;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid var(--white_primary);
        }

        /* @media (max-width: 768px) {
          input {
            background-color: red;
          }
        }

        @media (min-width: 769px) {
          input {
            background-color: purple;
          }
        } */
      `,
    ];
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated() {}

  render() {
    return html`
    <input type="search"></input>
    `;
  }
}

customElements.define("c-search", C_Search);
