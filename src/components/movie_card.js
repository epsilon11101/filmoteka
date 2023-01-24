import { LitElement, html, css } from "lit";
import getMovies from "../scripts/api_request";

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
          padding: 20px 20px 0px;
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
    getMovies().then(this.printMovies.bind(this));
  }

  printMovies(movies) {
    const $card = this.shadowRoot.querySelector(".card");

    const insertMovie = movies
      .map(
        (movie) =>
          /* const genres = movie.genres.map((genre) => " " + genre.name);
      $movie_gender.textContent = genres;*/
          `<div class="movieCard"><img class="movieCard__image" height="398" src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" alt=${movie.title}/>
          <div class="movieCard__title">${movie.title}</div>
          <span class="movieCard__gender"></span>
          <span class="movieCard__year"> | ${
            movie.release_date.split("-")[0]
          } </span>
          <span class="movieCard__vote"> ${movie.vote_average}</span>
          </div>`
      )
      .join("");

    $card.insertAdjacentHTML("afterbegin", insertMovie);
  }

  render() {
    return html` <div class="card"></div> `;
  }
}

customElements.define("movie-card", MovieCard);
