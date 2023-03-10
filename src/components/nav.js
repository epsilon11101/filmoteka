import { LitElement, html, css } from "lit";
import "./button";
import images from "../scripts/assets";

class C_Nav extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 100%;
        }
        .nav-container {
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 46px;
        }
        .nav-menu-container {
          width: 100%;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .nav-menu li {
          list-style: none;
          cursor: pointer;
        }
        .nav-menu .logo {
          display: flex;
          gap: 26px;
          justify-content: center;
          align-items: center;
        }
        .nav-menu .logo h1 {
          display: none;
        }
        .nav-menu .menu {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 39px;
        }
        .nav-menu li a {
          font-size: 12px;
          position: relative;
        }
        .nav-menu li a::after {
          content: "";
          width: 0%;
          height: 2px;
          display: block;
          background-color: var(--orange_primary);
          position: absolute;
          top: 25px;
          left: 0px;
          z-index: 1000020;
          transition: width 0.5s ease;
        }
        .nav-menu a:hover::after {
          width: 100%;
        }
        .nav-btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 19.62px;
        }
        a {
          all: unset;
        }
        @media screen and (min-width: 767px) {
          .nav-menu .logo h1 {
            display: block;
          }
        }
        @media screen and (min-width: 1024px) {
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
      <nav class="nav-container">
        <div class="nav-menu-container">
          <ul class="nav-menu">
            <li>
              <div class="logo">
                <img
                  src=${images.icon}
                  alt="movie_icon"
                  @click="${this._homeHandler}"
                />
                <h1 @click="${this._homeHandler}">Filmoteka</h1>
              </div>
            </li>
            <li>
              <div class="menu">
                <a href="index.html">HOME</a>
                <a href="user.html">MY LIBRARY</a>
              </div>
            </li>
          </ul>
        </div>
        <slot name="search"></slot>
        <div class="nav-btn-container">
          <slot name="button"></slot>
        </div>
      </nav>
    `;
  }

  _homeHandler(e) {
    location.href = "index.html";
  }
}

customElements.define("c-nav", C_Nav);
