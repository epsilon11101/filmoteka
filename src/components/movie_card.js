import { LitElement, html, css } from "lit";
import "./modal";
import "./page";
import MovieApi from "../scripts/movie_api";
import notFound from "../assets/notfound.jpg";
import { load } from "../scripts/local_save";
import Notiflix from "notiflix";

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
      card_content: { type: String },
      searchContent: { type: String },
      user: { type: Boolean },
      searching: { type: Boolean },
      $nextbtn: { type: String },
      $prevbtn: { type: String },
      $page: { type: String },
    };
  }

  constructor() {
    super();
    this.API = new MovieApi();
    this.card_content = "";
    this.searchContent = "";
    this.user = false;
    this.searching = true;
    this.API.page = 1;
  }

  async firstUpdated() {
    await this.updateComplete;
    this.renderCards();
    this.$page = this.shadowRoot.querySelector("c-page");
    this.btnEvents();
  }

  renderCards() {
    if (!this.user) {
      this.API.get_Genre().then(this.generateMovies.bind(this));
    }
  }

  btnEvents() {
    this.$nextbtn = this.$page.shadowRoot.querySelector("[type='next']");
    this.$prevbtn = this.$page.shadowRoot.querySelector("[type='prev']");
    this.$nextbtn.addEventListener("click", (e) => {
      this.$page.increment();
      this.API.page = this.$page.page;
      if (this.searching) this.renderCards();
      else this.newCardContent();
    });
    this.$prevbtn.addEventListener("click", (e) => {
      this.$page.decrement();
      this.API.page = this.$page.page;
      if (this.searching) this.renderCards();
      else this.newCardContent();
    });
  }

  createMovieCard(movies, genres) {
    const cards = movies
      .map((movie) => {
        const { title, vote_average: vote, id } = movie;

        const genre_ids =
          "genre_ids" in movie
            ? movie.genre_ids
            : movie.genres.map((gen) => gen.id);

        let date = movie.release_date;
        let url = movie.poster_path;

        if (date) date = date.split("-")[0];
        url = url === null ? notFound : `https://image.tmdb.org/t/p/w500${url}`;

        const mov_gen = [...genre_ids.map((gen) => genres.get(gen))];
        if (mov_gen.length > 2) mov_gen[2] = " Other";

        return ` <div class="movieCard">
          <img class="movieCard__image" height="398" src="${url}" alt=${
          movie.title
        } id=${id}/>
            <div class="movieCard__title">${title}</div>
            <span class="movieCard__gender">${mov_gen.slice(0, 3)}</span>
            <span class="movieCard__year"> | ${date} </span>
            <span class="movieCard__vote"> ${vote.toFixed(2)}</span>
          </div>`;
      })
      .join("");
    return cards;
  }

  generateSearchMovies(genres) {
    this.API.query_params = "search/movie";
    const $card = this.shadowRoot.querySelector(".card");
    const page = this.shadowRoot.querySelector("c-page");
    $card.innerHTML = "";

    this.API.getAllData()

      .then((movies) => {
        if (!movies.results.length) {
          Notiflix.Notify.failure("sorry movie not found");
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
        page.total_pages = movies.total_pages;
        page.restoreValues();
        $card.innerHTML = this.createMovieCard(movies.results, genres);
      })
      .finally(() => {
        this.card_content = $card.innerHTML;
      });
    this.API.query = "";
  }

  generateMovies(genres) {
    this.API.query_params = "trending/movie/week";
    const $card = this.shadowRoot.querySelector(".card");
    const page = this.shadowRoot.querySelector("c-page");
    page.restoreValues();
    $card.innerHTML = "";
    this.API.getAllData()
      .then((movies) => {
        page.total_pages = movies.total_pages;
        $card.innerHTML = this.createMovieCard(movies.results, genres);
      })
      .finally(() => {
        this.card_content = $card.innerHTML;
      });
  }

  newCardContent() {
    this.API.query = this.searchContent;
    if (this.searching) {
      this.API.page = 1;
      this.$page.page = 1;
      this.$page.pages = 1;
      /* this.$page.changeElements(); */
    }
    this.searching = false;
    this.API.get_Genre().then(this.generateSearchMovies.bind(this));
  }

  Watched() {
    this.innerHTML = "";
    this.API.get_Genre().then(this.generateWatched.bind(this));
  }
  Queue() {
    this.innerHTML = "";
    this.API.get_Genre().then(this.generateQueue.bind(this));
  }

  generateWatched(genres) {
    this.API.query_params = "trending/movie/week";
    const $card = this.shadowRoot.querySelector(".card");
    $card.innerHTML = "";
    const watched = load("watched");
    const watched_movies = [];
    watched.map((movie_id) => {
      this.API.query_params = `movie/${movie_id}`;
      this.API.getAllData()
        .then((movie) => {
          watched_movies.push(movie);
        })
        .then(() => {
          $card.innerHTML = this.createMovieCard(watched_movies, genres);
        })
        .finally(() => {
          this.card_content = $card.innerHTML;
        });
    });

    /* $card.innerHTML = this.createMovieCard(movies, genres); */
  }
  generateQueue(genres) {
    this.API.query_params = "trending/movie/week";
    const $card = this.shadowRoot.querySelector(".card");
    $card.innerHTML = "";
    const watched = load("queue");
    const watched_movies = [];
    watched.map((movie_id) => {
      this.API.query_params = `movie/${movie_id}`;
      this.API.getAllData()
        .then((movie) => {
          watched_movies.push(movie);
        })
        .then(() => {
          $card.innerHTML = this.createMovieCard(watched_movies, genres);
        })
        .finally(() => {
          this.card_content = $card.innerHTML;
        });
    });

    /* $card.innerHTML = this.createMovieCard(movies, genres); */
  }

  _cardHandler(e) {
    let card_target = e.target.id;
    if (card_target) {
      card_target = card_target.replace("/", "");

      this.API.query_params = `movie/${card_target}`;

      this.API.getAllData().then((id_movie) => {
        let url = id_movie.poster_path;
        url = url === null ? notFound : `https://image.tmdb.org/t/p/w500${url}`;
        const movie_prop = {
          img_url: url,
          vote: id_movie.vote_average,
          votes: id_movie.vote_count,
          popularity: id_movie.popularity,
          title: id_movie.original_title,
          genre: id_movie.genres.name,
          about: id_movie.overview,
          id: card_target,
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
      <c-page @page-sent="${this._handlePageSent}"></c-page>
    `;
  }

  _handlePageSent(e) {
    this.API.page = e.detail;
    if (this.searching) this.renderCards();
    else this.newCardContent();

    /* 
    TODO: FALTA HACER QUE NUEVAMENTE LOS BOTONES SE ACUTALICEN
    puede ser con un evenlistener cuando se haga el update
    en el elemento hijo el ememento padre crea un 
    evento que se propaga y el elemento hijo lo escucha
    */
  }
}

customElements.define("movie-card", MovieCard);
