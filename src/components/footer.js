import { LitElement, html, css } from "lit";
import "./button";
import bg_mobile from "../assets/images/mobile/mobile_user.png";
import bg_desktop from "../assets/images/desktop/desktop_user.png";
import heart from "../assets/icon/heart.png";
class C_Footer extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .footer-container {
          width: 320px;
          min-height: 100px;
          background-size: cover;
          display: inline-block;
          background-color: #f7f7f7;
        }

        .text-1 p {
          font-family: "Roboto";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          padding-top: 20px;
          padding-left: 67px;
          padding-right: 66px;
          display: flex;
          align-items: center;
          text-align: center;
          width: 187px;
          height: 15.84px;

          color: #545454;
        }

        .text-2 p {
          width: 236px;
          height: 15.84px;
          font-family: "Roboto";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          padding-left: 48px;
          padding-right: 36px;
          padding-bottom: 17px;
          display: flex;
          align-items: center;
          text-align: center;

          color: #545454;
        }

        .text-2 p a{
          color: #545454;
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
            Developed with &nbsp; <img src=${heart} alt="heart" />&nbsp; by &nbsp; <a href="">GoIT
            Students</a>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("c-footer", C_Footer);
