import { LitElement, html, css } from "lit";
import "./modal";
import MovieApi from "../scripts/movie_api";

class MovieCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .card{

              display:flex;
              justify-content:center;
              align-items:center;
              flex-wrap:wrap;
        }
        .movieCard {
          font-size: 12px;
          color: var(--orange_primary);
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
          color: var(--black_primary);
          line-height: 16px;
          text-transform: uppercase;
        }
        .movieCard__vote {
          color: var(--white_primary);
          background-color: var(--orange_primary);
          align-items: center;
          text-align: center;
          border-radius: 5px;
          padding: 1px 6px;
          margin-left: 10px;
        }
        @media screen and (min-width: 767px) {
          .movieCard {
            
            width: 294px;
          }
          .card {
            display: flex;
            flex-wrap: wrap;
            width: 768px;
          }
          @media screen and (min-width: 1024px) {
            .card {
              width: 100%;
            }
            .movieCard {
              width: 274px;
              padding: 30px 30px 0px;
            }
          }
      `,
    ];
  }

  static get properties() {
    return {
      API: { type: Object },
    };
  }

  constructor() {
    super();
    this.API = new MovieApi();
  }

  firstUpdated() {
    this.API.get_Genre().then(this.generateMovies.bind(this));
  }

  createMovieCard(movies, genres) {
    const cards = movies.results
      .map((movie) => {
        const {
          title,
          genre_ids,
          poster_path: url,
          release_date: date,
          vote_average: vote,
          id,
        } = movie;
        const mov_gen = [...genre_ids.map((gen) => genres.get(gen))];
        if (mov_gen.length > 2) mov_gen[2] = " Other";

        return ` <div class="movieCard">
          <img class="movieCard__image" height="398" src="https://image.tmdb.org/t/p/w500${url}" alt=${
          movie.title
        } id=${id}/>
            <div class="movieCard__title">${title}</div>
            <span class="movieCard__gender">${mov_gen.slice(0, 3)}</span>
            <span class="movieCard__year"> | ${date.split("-")[0]} </span>
            <span class="movieCard__vote"> ${vote.toFixed(2)}</span>
          </div>`;
      })
      .join("");
    return cards;
  }

  generateMovies(genres) {
    this.API.query_params = "trending/movie/week";
    this.API.getAllData().then((movies) => {
      const $card = this.shadowRoot.querySelector(".card");
      $card.innerHTML = this.createMovieCard(movies, genres);
    });
  }

  _cardHandler(e) {
    let card_target = e.target.id;
    if (card_target) {
      card_target = card_target.replace("/", "");

      this.API.query_params = `movie/${card_target}`;
      console.log(this.API.url);
      this.API.getAllData().then((id_movie) => {
        const movie_prop = {
          img_url: `https://image.tmdb.org/t/p/w500${id_movie.poster_path}`,
          vote: id_movie.vote_average,
          votes: id_movie.vote_count,
          popularity: id_movie.popularity,
          title: id_movie.original_title,
          genre: id_movie.genres.name,
          about: id_movie.overview,
        };

        const $modal = this.shadowRoot.querySelector("c-modal");
        $modal.open = true;
        $modal.movie_prop = movie_prop;
      });
    }
  }

  render() {
    return html`
      <c-modal></c-modal>
      <div class="card" @click="${this._cardHandler}"></div>
    `;
  }
}

customElements.define("movie-card", MovieCard);
