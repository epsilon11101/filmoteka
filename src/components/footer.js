import { LitElement, html, css } from "lit";
import heart from "../assets/heart.png";

class C_Footer extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          margin-top: 10px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 77px;
          width: 100%;
          background-color: #f7f7f7;
          color: var(--primary_gray);
        }
        .footer-container {
          display: flex;
          font-size: 16px;
          line-height: 18.75px;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        a {
          all: unset;
          text-decoration: underline;
          cursor: pointer;
        }

        @media screen and (min-width: 767px) {
          .footer-container {
            flex-direction: row;
            gap: 5px;
          }
        }

        @media screen and (min-width: 1024px) {
        }
      `,
    ];
  }

  static properties = {};

  constructor() {
    super();
  }

  firstUpdated() {}

  render() {
    return html`
      <div class="footer-container">
        <div class="text-1"><p>© 2020 | All Rights Reserved |</p></div>
        <div class="text-2">
          <p>
            Developed with &nbsp; <img src=${heart} alt="heart" />&nbsp; by
            &nbsp; <a href="#">GoIT Students</a>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("c-footer", C_Footer);
