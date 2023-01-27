import { LitElement, html, css } from "lit";
import "./button";
import "./search";
import "../assets/mobile_user.png";
import "../assets/desktop_user.png";
import "../assets/mobile_main.png";
import "../assets/desktop_main.png";
import icon from "../assets/film_icon.png";

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
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 19.62px;
        }
        a {
          all: unset;
        }
      `,
    ];
  }

  static get properties() {
    return {
      user_nav: { type: Boolean },
      url: { type: String },
    };
  }

  constructor() {
    super();
    this.url = "";
  }

  firstUpdated() {
    // console.log(this.url);
    // if (this.user_nav) {
    //   const $nav_container = this.shadowRoot.querySelector(".nav-container");
    //   $nav_container.style.backgroundImage = `url(${bg_mobile})`;
    //   const $button = this.shadowRoot.querySelector('[title="WATCHED"]');
    //   $button.addEventListener("click", () => {
    //     console.log("boton presionado");
    //   });
    // }
  }

  render() {
    return html`
      <header
        style="background-image:
              url(${this.url});"
      >
        <nav class="nav-container">
          <div class="nav-menu-container">
            <ul class="nav-menu">
              <li>
                <div class="logo">
                  <img src=${icon} alt="movie_icon" />
                  <h1>Filmoteka</h1>
                </div>
              </li>
              <li><a href="index.html">HOME</a></li>
              <li><a href="user.html">MY LIBRARY</a></li>
            </ul>
          </div>

          <slot name="search"></slot>
          <div class="nav-btn-container" @click="${this._btnHandler}">
            <slot name="button"></slot>
          </div>
        </nav>
      </header>
    `;
  }
  _btnHandler(e) {
    console.log(e.target);
  }
}

customElements.define("c-header", C_Header);