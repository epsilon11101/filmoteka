import { LitElement, html, css } from "lit";
import "./get_data";

class MovieCardApi extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css``;
  }

  firstUpdated() {
    const KEY = "d9b50eb87c44c0faed349508e17a23e7";
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=es`;
    return URL;
  }

  constructor() {
    super();
    this.cardMovie = [];
    this.addEventListener("ApiData", (e) => {
      this.dataFormMovie(e.detail.data);
    });
  }

  dataFormMovie(data) {
    let movies = [];
    data.forEach((movie) => {
      movies.push({
        img:
          "https://image.tmdb.org/t/p/w500https://image.tmdb.org/t/p/w500" +
          movie.backdrop_path,
        title: movie.title,
        vote: movie.vote_average,
        year: movie.release_date.split("-")[0],
      });
    });

    this.cardMovie = movies;
    console.log(this.cardMovie);
  }
  render() {
    return html`<get-data
        url="https://api.themoviedb.org/3/discover/movie?api_key=d9b50eb87c44c0faed349508e17a23e7&language=es"
        method="GET"
      ></get-data>
      ${this.dateTemplate}`;
  }

  get dateTemplate() {
    return html` ${this.cardMovie.map(
      (card) => html`
        <div class="movieCard">
          <img class="movieCard__image" src="${card.img}">
        </div>
      `
    )}`;
  }
}

customElements.define("card-api", MovieCardApi);
