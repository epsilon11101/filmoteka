import { LitElement, html, css } from "lit";
import "./main";
import "../components/header";
import "../components/search";
import "../components/main";

class C_Root_U extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 100%;
        }
        c-button.selected {
          --btn-color: var(--orange_primary);
          --btn-text_color: var(--white_primary);
        }
      `,
    ];
  }
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated() {}

  updated() {
    const $main = this.shadowRoot.querySelector("c-main");
    $main.generateWatched();
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector("slot");
    return slot.assignedElements({ flatten: true })[0];
  }

  render() {
    return html`
      <c-header url="../assets/desktop_user.png">
        <c-nav @click="${this._btnHandler}">
          <c-button title="WATCHED" slot="button" class="selected"></c-button>
          <c-button title="QUEUE" slot="button"></c-button>
        </c-nav>
      </c-header>
      <c-main></c-main>
    `;
  }

  _btnHandler(e) {
    const $main = this.shadowRoot.querySelector("c-main");
    const buttons = [...this.shadowRoot.querySelectorAll("c-button")];
    if (e.target.title.includes("WATCHED")) {
      $main.generateWatched();
      buttons[0].classList.add("selected");
      buttons[1].classList.remove("selected");
    } else {
      $main.generateQueue();
      buttons[0].classList.remove("selected");
      buttons[1].classList.add("selected");
    }
  }
}

customElements.define("c-root_u", C_Root_U);
