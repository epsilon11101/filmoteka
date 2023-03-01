import { LitElement, html, css } from "lit";
import { save, load, remove } from "../scripts/local_save";
import Notiflix from "notiflix";

class C_Button extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }
        button {
          background-color: var(--btn-color, transparent);
          width: var(--btn-width, 130.19px);
          min-height: var(--btn-height, 44px);
          border-radius: 5px;
          color: var(--btn-text_color, var(--white_primary));
          border: solid 1px var(--btn-border_color, var(--white_primary));
        }

        button:hover {
          color: var(--h_btn-text_color, var(--white_primary));
          background-color: var(--h_btn-color, var(--orange_primary));
          cursor: pointer;
        }

        @media screen and (min-width: 767px) {
          button {
            --btn-width: 136px;
          }
        }
        @media screen and (min-width: 1024px) {
        }
      `,
    ];
  }

  static properties = {
    title: { type: String },
    movie_name: { type: String },
    id: { type: Number },
  };

  constructor() {
    super();
    this.title = "";
  }

  render() {
    return html` <button>${this.title}</button> `;
  }

  _updatePage() {
    if (!window.location.href.includes("index")) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

  _handleWatched(key, value) {
    const watched = [];
    const data = load("watched");
    watched.push(...data);
    Notiflix.Notify.success(`Added ${this.movie_name} to  WATCHED`);
    if (!watched.includes(value)) {
      watched.push(value);
      save(key, watched);
    } else {
      Notiflix.Notify.warning(
        `Movie ${this.movie_name} was remove from  WATCHED`
      );
      remove("watched", this.id);
      this._updatePage();
    }
  }
  _handleQueue(key, value) {
    const queue = [];
    const data = load("queue");
    queue.push(...data);
    if (!queue.includes(value)) {
      Notiflix.Notify.success(`Added ${this.movie_name} to  QUEUE`);
      queue.push(value);
      save(key, queue);
    } else {
      Notiflix.Notify.warning(
        `Movie ${this.movie_name} was remove from  QUEUE`
      );
      remove("queue", this.id);
      this._updatePage();
    }
  }
}

customElements.define("c-button", C_Button);
