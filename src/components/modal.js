import { LitElement, html, css } from "lit";
import "./button";
import "../assets/remove.png";

class C_Modal extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          color: black;
          text-align: left;
          width: 280px;
          height: 100vh;
        }
        .modal_container {
          background-color: var(--white_primary);
          margin-top: 48px;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 10px;
        }
        .image-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image-container img {
          width: 240px;
          height: 357px;
          object-fit: cover;
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
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: absolute;
          top: 1%;
          left: 85%;
          min-width: 25px;
          height: 20px;
          font-size: 10px;
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
        }
        h6,
        p {
          color: var(--primary_dark);
        }
        p {
          line-height: 20px;
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
          }
          span.btn-close {
            left: 93%;
            min-width: 30px;
            height: 25px;
            font-size: 15px;
          }
          .image-container img {
            width: 264px;
            height: 374px;
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
          }
          span.btn-close {
            left: 95%;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      movie_prop: { type: Object },
    };
  }

  constructor() {
    super();
    this.movie_prop = {
      img_url: "../assets/remove.png",
      vote: "7.3",
      votes: "1260",
      popularity: "100.2",
      title: "A FISTFUL OF DEAD",
      genre: "Western",
      about:
        "Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve been double crossed – but by who and how? ",
    };
  }

  firstUpdated() {}

  render() {
    return html`
      <div class="modal_container">
        <span class="btn-close">X</span>
        <div class="image-container">
          <img src=${this.movie_prop.img_url} />
        </div>
        <div>
          <div class="modal_header">
            <h3 class="title">A FIRST OF LEAD</h3>
            <div class="table">
              <div class="col">
                <div class="row movie_prop">Vote/Votes</div>
                <div class="row movie_prop">Popularity</div>
                <div class="row movie_prop">Original Title</div>
                <div class="row movie_prop">Genre</div>
              </div>
              <div class="col">
                <div class="row movie_data">
                  <span>${this.movie_prop.vote}</span>/${this.movie_prop.votes}
                </div>
                <div class="row movie_data">${this.movie_prop.popularity}</div>
                <div class="row movie_data">${this.movie_prop.title}</div>
                <div class="row movie_data">${this.movie_prop.genre}</div>
              </div>
            </div>
          </div>
          <div class="modal_body">
            <h6>ABOUT</h6>
            <p>${this.movie_prop.about}</p>
          </div>
          <div class="modal_footer">
            <c-button title="ADD TO WATCHED"></c-button>
            <c-button title="ADD TO QUEUE"></c-button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("c-modal", C_Modal);
