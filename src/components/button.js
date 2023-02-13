import { LitElement, html, css } from "lit";
import { save, load } from "../scripts/local_save";
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
  };

  constructor() {
    super();
    this.title = "";
  }

  render() {
    return html` <button>${this.title}</button> `;
  }

  _handleWatched(key, value) {
    const watched = [];
    const data = load("watched");
    watched.push(...data);
    if (!watched.includes(value)) {
      Notiflix.Notify.success(`Added ${this.movie_name} to  WATCHED`);
      watched.push(value);
    } else {
      Notiflix.Notify.info(`Movie ${this.movie_name} exits in  WATCHED`);
    }
    save(key, watched);
  }
  _handleQueue(key, value) {
    const queue = [];
    const data = load("queue");
    queue.push(...data);
    if (!queue.includes(value)) {
      Notiflix.Notify.success(`Added ${this.movie_name} to  QUEUE`);
      queue.push(value);
    } else {
      Notiflix.Notify.info(`Movie ${this.movie_name} exits in  QUEUE`);
    }
    save(key, queue);
  }
}

customElements.define("c-button", C_Button);
