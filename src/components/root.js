import { LitElement, html, css } from "lit";
import "./main";
import "../components/header";
import "../components/search";
import "../components/main";
import "../components/footer";
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
  }

  firstUpdated() {}

  updated() {
    const $header = this._slottedChildren;
    const $nav = $header.children[0];
    const $search_component = $nav.children[0];
    const $search_btn = $nav.children[0].children[0];
    const $main = this.shadowRoot.querySelector("c-main");
    $search_btn.addEventListener("click", () => {
      $search_component._searchHandler();
      $main.setCardContent($search_component.input_value);
    });
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
