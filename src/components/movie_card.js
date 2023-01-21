import { LitElement, html, css } from "lit";

class MovieCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .movieCard {
          font-size: 12px;
          color: #ff6b08;
          width: 280px;
          padding: 20px;
        }
        .movieCard__image {
          width: 100%;
          object-fit: cover;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .movieCard__title {
          color: #000000;
          line-height: 16px;
          text-transform: uppercase;
        }
        .movieCard__vote {
          color: #ffffff;
          background-color: #ff6b08;
          align-items: center;
          text-align: center;
          border-radius: 5px;
          padding: 1px 6px;
          margin-left: 10px;
        }
      `,
    ];
  }

  firstUpdated() {
    //example es un ejemplo recibiendo un array de objetos con los datos
    const example = [
      {
        image:
          "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
        genres: [
          {
            id: 18,
            name: "Drama",
          },
        ],
        title: "A title",
        year: "1999",
        vote_average: 7.8,
      },
    ];

    const $movie_image = this.shadowRoot.querySelector(".movieCard__image");
    const $movie_title = this.shadowRoot.querySelector(".movieCard__title");
    const $movie_gender = this.shadowRoot.querySelector(".movieCard__gender");
    const $movie_year = this.shadowRoot.querySelector(".movieCard__year");
    const $movie_vote = this.shadowRoot.querySelector(".movieCard__vote");

    //agrega la información proveniente del array de objetos
    $movie_image.src = example[0].image;
    $movie_image.alt = example[0].title;
    $movie_title.textContent = example[0].title;

    const genres = example[0].genres.map((genre) => " " + genre.name);
    $movie_gender.textContent = genres;

    $movie_year.textContent = "| " + example[0].year;
    $movie_vote.textContent = example[0].vote_average;
  }

  render() {
    return html`
      <div class="movieCard">
        <img class="movieCard__image" height="398" src="" alt="" />
        <div class="movieCard__title"></div>
        <span class="movieCard__gender"></span>
        <span class="movieCard__year"></span>
        <span class="movieCard__vote"></span>
      </div>
    `;
  }
}

customElements.define("movie-card", MovieCard);
