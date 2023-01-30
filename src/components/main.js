import { LitElement, html, css } from "lit";
import "./movie_card";

class C_Main extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 100%;
        }
        main {
          max-width: 100%;
          background-size: cover;
        }
      `,
    ];
  }
  static get properties() {
    return {
      card_html: { type: String },
      $movie_card: { type: String },
      $c_page: { type: String },
    };
  }

  constructor() {
    super();
    this.$movie_card = "";
  }

  firstUpdated() {}

  get cardContent() {
    this.$movie_card = this.shadowRoot.querySelector("movie-card");
    this.card_html = this.$movie_card.card_content;
    return this.card_html;
  }

  setCardContent(inner) {
    this.$movie_card = this.shadowRoot.querySelector("movie-card");
    this.$movie_card.searchContent = inner;
    this.$movie_card.newCardContent();
  }

  async generateWatched() {
    (await this.$movie_card) != null;
    this.$movie_card = this.shadowRoot.querySelector("movie-card");
    this.$movie_card.user = true;
    this.$movie_card.Watched();
  }

  generateQueue() {
    this.$movie_card = this.shadowRoot.querySelector("movie-card");
    this.$movie_card.Queue();
  }

  render() {
    return html`
      <main>
        <movie-card></movie-card>
      </main>
    `;
  }
}

customElements.define("c-main", C_Main);
