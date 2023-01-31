import { LitElement, html, css } from "lit";

class C_Page extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 100%;
          color: var(--black_primary);
          margin-top: 40px;
          width: 100%;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        ul {
          display: flex;
          gap: 15px;
        }
        li {
          list-style: none;
          min-width: 40px;
          min-height: 40px;
          background-color: transparent;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          cursor: pointer;
        }
        li:hover {
          background-color: var(--orange_primary);
          color: var(--white_primary);
        }
        li:first-child,
        li:last-child {
          background-color: var(--secundary_white);
          color: var(--black_primary);
        }
        li:nth-child(2) {
          background-color: var(--orange_primary);
          color: var(--white_primary);
        }
      `,
    ];
  }
  static get properties() {
    return {
      btn_value: { type: Number },
      page: { type: Number },
      pages: { type: Number },
      total_pages: { type: Number },
      restore_pages: { type: Boolean },
      hidden: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.page = 1;
    this.total_pages = 0;
    this.pages = 1;
    this.restore_paes = true;
    this.hidden = false;
  }

  firstUpdated() {
    this.hidden = document.URL.includes("user") ? true : false;
    this.style.display = this.hidden ? "none" : "block";
  }

  updated() {}

  render() {
    return html`
      <div>
        <ul @click="${this._handleSelecteElement}">
          <li type="prev"><-</li>
          <li id="btn-page">1</li>
          <li id="btn-page">2</li>
          <li id="btn-page">3</li>
          <li id="btn-page">4</li>
          <li id="btn-page">5</li>
          <li type="next">-></li>
        </ul>
      </div>
    `;
  }
  _handleSelecteElement(e) {
    this.btn_value = parseInt(e.target.innerText);
  }

  increment() {
    this.pages += 1;
    this.page < this.total_pages ? (this.page += 1) : this.total_pages;
    if (this.pages > 5) {
      const allBtns = [...this.shadowRoot.querySelectorAll("#btn-page")];
      this.changePage(allBtns);
      this.pages = 1;
    }

    this.changeElements();
  }
  decrement() {
    this.pages -= 1;
    this.page = this.page > 1 ? (this.page -= 1) : 1;
    if (this.pages < 2) {
      const allBtns = [...this.shadowRoot.querySelectorAll("#btn-page")];
      this.changePage(allBtns);
      this.pages = this.page === 1 ? 1 : 5;
    }

    this.changeElements();
  }

  changeElements() {
    const allBtns = [...this.shadowRoot.querySelectorAll("#btn-page")];

    let index = this.pages;

    if (this.pages < 2) index = 0;
    if (this.pages >= 2 && this.pages <= 4) index -= 1;
    if (this.pages > 4) {
      index = 4;
    }

    allBtns[index].style.backgroundColor = "var(--orange_primary)";
    allBtns[index].style.color = "var(--white_primary)";
    this.restoreColors(allBtns, index);
  }

  changePage(btns) {
    let page_number = this.page;

    if (this.pages < 2 && this.page > 1) {
      btns.reverse().map((btn) => {
        btn.innerText = page_number;
        page_number -= 1;
      });
    }
    if (this.pages >= 4) {
      btns.map((btn) => {
        btn.innerText = page_number;
        page_number += 1;
      });
    }
  }
  restoreColors(btns, index) {
    btns.map((btn, i) => {
      if (i != index) {
        btn.style.backgroundColor = "transparent";
        btn.style.color = "var(--black_primary)";
      }
    });
  }
}

customElements.define("c-page", C_Page);
