import { LitElement, html, css } from "lit";
import { load } from "../scripts/local_save";
import { classMap } from "lit/directives/class-map.js";
import "./button";

class C_Modal extends LitElement {
  static get styles() {
    return [
      css`
        .wrapper {
          color: var(--black_primary);
          top: 0px;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          opacity: 0;
          backdrop-filter: blur(10px);
          position: fixed;
          z-index: 10;
          transition: opacity 0.25s ease-in;
        }
        .wrapper:not(.open) {
          visibility: hidden;
        }
        .wrapper.open {
          opacity: 1;
          visibility: visible;
        }
        .modal_container {
          position: relative;
          background-color: var(--white_primary);
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 10px;
          top: 0;
          overflow: auto;
          max-height: 80%;
        }
        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
        }
        .image-container img {
          width: 240px;
          height: 357px;
          object-fit: cover;
          margin-top: 200px;
        }
        .modal_header {
          width: 100%;
        }
        .modal_header .table {
          width: 100%;
          display: flex;
          gap: 70px;
        }
        .modal_header .row {
          display: flex;
          width: 100%;
          align-items: flex-start;
        }
        .modal_header .col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .modal_body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
        }
        .modal_footer {
          width: 100%;
          display: flex;
          margin-top: 21px;
          margin-bottom: 41px;
          align-items: center;
          justify-content: center;
          gap: 14.85px;
        }
        .modal_footer c-button {
          --btn-width: 112.58px;
          --btn-border_color: var(--black_primary);
          --btn-text_color: var(--black_primary);
        }
        c-button.selected {
          --btn-color: var(--orange_primary);
          --btn-text_color: var(--white_primary);
        }

        span {
          text-align: center;
          display: block;
          background-color: var(--orange_primary);
          min-width: 36px;
          height: 16px;
          color: white;
          border-radius: 5px;
          padding: 0 5px;
        }

        span.btn-close {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-right: 15px;
          min-width: 25px;
          height: 20px;
          font-size: 10px;
          top: 1%;
          left: 85%;
        }
        p,
        h6,
        .movie_prop {
          font-size: 12px;
          line-height: 16px;
          color: var(--primary_gray);
        }
        .movie_data {
          font-size: 12px;
          line-height: 14.06px;
        }
        .title {
          font-size: 20px;
          line-height: 23.44px;
          text-transform: uppercase;
        }

        h6,
        p {
          color: var(--primary_dark);
        }
        p:not(.watched) {
          line-height: 20px;
          overflow: scroll;
          height: 100px;
          margin-right: 10px;
          padding: 10px 10px;
        }
        @media screen and (min-width: 767px) {
          :host {
            width: 618px;
            height: 231px;
          }

          .modal_container {
            flex-direction: row;
            gap: 32px;
            justify-content: center;
            align-items: center;
            top: -20%;
          }
          span.btn-close {
            min-width: 30px;
            height: 25px;
            font-size: 15px;
            top: 2%;
            left: 95%;
          }
          .image-container img {
            width: 264px;
            height: 374px;
            margin-top: 0;
          }
        }
        @media screen and (min-width: 1024px) {
          :host {
            width: 882px;
            height: 568px;
          }
          .image-container img {
            width: 396px;
            height: 478px;
            margin-bottom: 20px;
          }
          .modal_container {
            width: 882px;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      movie_prop: { type: Object },
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.movie_prop = {
      img_url: "",
      vote: "",
      votes: "",
      popularity: "",
      title: "",
      genre: "",
      about: "",
      id: "",
    };
  }
  firstUpdated() {}

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this._closeHandler();
      }
    });
  }

  disconnectedCallback() {
    document.removeEventListener("keydown");
  }

  render() {
    return html`
      <div
        class=" ${classMap({
          wrapper: true,
          open: this.open,
        })}"
        @click="${this._closeHandler}"
      >
        <div class="modal_container " >
          <span class="btn-close" @click="${this._closeHandler}">X</span>
          <div class="image-container">
            <img src=${this.movie_prop.img_url} />
          </div>
          <div>
            <div class="modal_header">
              <h3 class="title">${this.movie_prop.title}</h3>
              <div class="table">
                <div class="col">
                  <div class="row movie_prop">Vote/Votes</div>
                  <div class="row movie_prop">Popularity</div>
                  <div class="row movie_prop">Original Title</div>
                  <div class="row movie_prop">Genre</div>
                </div>
                <div class="col">
                  <div class="row movie_data">
                    <span>${this.movie_prop.vote}</span>/${
      this.movie_prop.votes
    }
                  </div>
                  <div class="row movie_data">
                    ${this.movie_prop.popularity}
                  </div>
                  <div class="row movie_data">${this.movie_prop.title}</div>
                  <div class="row movie_data">${this.movie_prop.genre}</div>
                </div>
              </div>
            </div>
            <div class="modal_body">
              <h6>ABOUT</h6>
              <p>${this.movie_prop.about}</p>
            </div>
            <div class="modal_footer" ">
              <c-button title="ADD TO WATCHED" @click="${
                this._btnHandler
              }" id="watched" ></c-button>
              <c-button title="ADD TO QUEUE" @click="${
                this._btnHandler
              }" id="queue"></c-button>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  async _loadWatched() {
    if (this.open) {
      const data = await load("watched");
      const btn = this.shadowRoot.querySelector("#watched");

      if (await data.includes(this.movie_prop.id)) {
        btn.classList.add("selected");
        return;
      }
      btn.classList.remove("selected");
    }
  }
  async _loadQueue() {
    if (this.open) {
      const data = await load("queue");
      const btn = this.shadowRoot.querySelector("#queue");

      if (await data.includes(this.movie_prop.id)) {
        btn.classList.add("selected");
        return;
      }
      btn.classList.remove("selected");
    }
  }

  _closeHandler() {
    this.open = false;
  }

  _btnHandler(e) {
    const { title, id } = this.movie_prop;
    if (e.target.title.includes("WATCHED")) {
      e.target.movie_name = title;
      e.target.id = id;
      e.target.classList.toggle("selected");
      e.target._handleWatched("watched", id);
      this._closeHandler();
    } else {
      e.target.movie_name = title;
      e.target.id = id;
      e.target._handleQueue("queue", id);
      this._closeHandler();
    }
  }
}

customElements.define("c-modal", C_Modal);
