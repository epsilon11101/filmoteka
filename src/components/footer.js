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
          width: 250px;
          height: 15.84px;
          font-family: "Roboto";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          padding-left: 40px;
          padding-right: 36px;
          padding-bottom: 17px;
          display: flex;
          align-items: center;
          text-align: center;

          color: #545454;
        }

        .text-2 p a {
          color: #545454;
        }

        @media screen and (min-width: 767px) {
          .footer-container {
            width: 767px;
            min-height: 100px;
            background-size: cover;
            display: inline-block;
          }

          .text-1 p {
            padding-top: 30px;
            padding-left: 170px;
            padding-bottom: 28px;
            display: flex;
            align-items: center;
            text-align: center;
            width: 175px;
            height: 15.84px;
          }

          .text-2 p {
            width: 260px;
            height: 15.84px;

            padding-left: 55px;
            padding-top: 30px;
            padding-right: 36px;
            padding-bottom: 17px;
            display: flex;
            align-items: center;
            text-align: center;
          }

          .text-2 p a {
            padding-left: 5px;
          }

          .text-2 {
            display: flex;

            align-items: baseline;
            display: inline-block;
          }

          .text-1 {
            width: 285px;
            display: flex;
            align-items: baseline;
            display: inline-block;
          }
        }

        @media screen and (min-width: 1024px) {
          .footer-container {
            width: 100%;
            background-size: cover;
            display: inline-block;
          }

          .text-1 p {
            padding-top: 30px;
            padding-left: 440px;
            padding-bottom: 28px;
            font-size: 16px;
            display: flex;
            align-items: center;
            text-align: center;
            width: 196px;
            height: 15.84px;
          }

          .text-2 p {
            width: 290px;
            height: 15.84px;

            padding-left: 350px;
            padding-top: 30px;
            padding-right: 270px;
            padding-bottom: 28px;
            font-size: 16px;
            display: flex;
            align-items: center;
            text-align: center;
          }

          .text-2 p a {
            padding-left: 5px;
            font-size: 16px;
          }

          .text-2 {
            display: flex;

            align-items: baseline;
            display: inline-block;
          }

          .text-1 {
            width: 285px;
            display: flex;
            align-items: baseline;
            display: inline-block;
          }
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
            &nbsp; <a href="">GoIT Students</a>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("c-footer", C_Footer);
