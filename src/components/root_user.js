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
          <c-button title="WATCHED" slot="button"></c-button>
          <c-button title="QUEUE" slot="button"></c-button>
        </c-nav>
      </c-header>
      <c-main></c-main>
    `;
  }

  _btnHandler(e) {
    const $main = this.shadowRoot.querySelector("c-main");
    if (e.target.title.includes("WATCHED")) {
      $main.generateWatched();
    } else {
      $main.generateQueue();
    }
  }
}

customElements.define("c-root_u", C_Root_U);
