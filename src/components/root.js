import { LitElement, html, css } from "lit";
import "./main";
import "../components/header";
import "../components/search";
import "../components/main";
import "../components/footer";
import Notiflix from "notiflix";
import { save } from "../scripts/local_save";
class C_Root extends LitElement {
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
    save("watched", []);
    save("queue", []);
  }

  firstUpdated() {
    this.addEventListener("keyup", this._handleEnter);
  }

  updated() {
    const $header = this._slottedChildren;
    const $nav = $header.children[0];
    const $search_component = $nav.children[0];
    const $search_btn = $nav.children[0].children[0];
    const $main = this.shadowRoot.querySelector("c-main");
    $search_btn.addEventListener("click", () => {
      $search_component._searchHandler();
      if ($search_component.input_value)
        $main.setCardContent($search_component.input_value);
      else Notiflix.Notify.warning("Fill the input field");
    });
  }

  _handleEnter(e) {
    if (e.target.slot.includes("search")) {
      if (e.key == "Enter") {
        e.target._searchHandler();
        const $main = this.shadowRoot.querySelector("c-main");
        if (e.target.input_value.length)
          $main.setCardContent(e.target.input_value);
        else Notiflix.Notify.warning("Fill the input field");
      }
    }
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector("slot");
    return slot.assignedElements({ flatten: true })[0];
  }

  render() {
    return html`
      <slot></slot>
      <c-main></c-main>
      <c-footer></c-footer>
    `;
  }
}

customElements.define("c-root", C_Root);
