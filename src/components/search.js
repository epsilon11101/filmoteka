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
        div {
          width: 70%;
          height: 30px;
          display: flex;
          align-items: center;
          padding: 10px;
          border: 1px var(--white_primary);
          border-style: none none solid none;
        }
        input {
          flex: 1;
          height: 100%;
          color: var(--white_primary);
          font-weight: var(--bold);
          font-size: 14px;
          outline: none;
          background-color: transparent;
          border: none;
        }
        ::slotted(i) {
          font-size: 20px;
          color: var(--white_primary);
        }

        @media (min-width: 767px) {
          div {
            width: 50%;
          }
        }

        @media (min-width: 1024px) {
          div {
            width: 33%;
          }
        }
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
    <div>
      <input type="search"></input>
        <slot name="icon"></slot>
    </div>
    
    `;
  }
}

customElements.define("c-search", C_Search);
