import { LitElement, html, css } from "lit";
import "./button";
import bg_mobile from "../assets/images/mobile/mobile_user.png";
import bg_desktop from "../assets/images/desktop/desktop_user.png";
import icon from "../assets/icon/film_icon.png";
class C_Nav extends LitElement {
  nav_styles = {
    backgroundImage: `${bg_mobile}`,
  };

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .nav-container {
          width: 320px;
          min-height: 230px;
          display: flex;
          flex-direction: column;
          background-size: cover;
        }
        .nav-menu {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-content: center;
          gap: 39px;
        }
        .nav-menu li {
          list-style: none;
          cursor: pointer;
        }
        .nav-menu li img {
          margin-right: 21px;
        }
        .nav-menu li a {
          font-size: 12px;
        }
        .nav-menu li a::before {
          content: "";
          width: 100%;
          display: block;
          background-color: #ff6b08;
        }

        .nav-btn-container {
          width: 100%;
          margin-top: 49px;
          display: flex;
          justify-content: center;
          gap: 19.62px;
        }
      `,
    ];
  }

  static properties = {};

  constructor() {
    super();
  }

  firstUpdated() {
    console.log(bg_mobile);
    const $nav_container = this.shadowRoot.querySelector(".nav-container");
    $nav_container.style.backgroundImage = `url(${this.nav_styles.backgroundImage})`;
  }

  render() {
    return html`
      <nav class="nav-container">
        <ul class="nav-menu">
          <li><img src=${icon} alt="movie_icon" /></li>
          <li><a>HOME</a></li>
          <li><a>MY LIBRARY</a></li>
        </ul>
        <div class="nav-btn-container">
          <c-button title="WATCHED"></c-button>
          <c-button title="QUEUE"></c-button>
        </div>
      </nav>
    `;
  }
}

customElements.define("c-nav", C_Nav);
