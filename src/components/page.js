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
          max-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        ul {
          max-width: 90%;
          display: flex;
          margin: 0 auto;
          padding: 0;
          gap: 10px;
          overflow: auto;
        }
        li {
          flex: 1;
          list-style: none;
          min-width: 40px;
          height: 40px;
          background-color: transparent;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          border: 1px solid black;
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
        .hide {
          display: none;
        }
      `,
    ];
  }
  static get properties() {
    return {
      btn_value: { type: Number },
      total_buttons: { type: Number },
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
    this.current_page = 0; // the current button
    this.total_buttons = 0;
    this.restore_paes = true;
    this.hidden = false;
  }

  firstUpdated() {
    this.hidden = document.URL.includes("user") ? true : false;
    this.style.display = this.hidden ? "none" : "block";
    console.table({ page: this.page, current_page: this.current_page });
  }

  updated() {
    this.generateButtons();
  }

  render() {
    return html`
      <div>
        <ul @click="${this._handleSelecteElement}">
          <li type="prev"><-</li>
          <li id="init">1</li>
          <li class="hide">...</li>
          <li class="btn-page hide btn">2</li>
          <li class="btn-page hide btn">3</li>
          <li class="btn-page hide btn">4</li>
          <li class="hide">...</li>
          <li class="hide last">${this.total_pages}</li>
          <li type="next">-></li>
        </ul>
      </div>
    `;
  }
  _handleSelecteElement(e) {
    this.btn_value = parseInt(e.target.innerText);
  }

  increment() {
    //increment button until limit
    this.current_page += 1;
    //increment page until limit
    this.page =
      this.page >= this.total_pages ? this.total_pages : this.page + 1;
    this.changeUpPage();

    console.table({
      currentBtn: this.current_page,
      currentPage: this.page,
    });
  }
  //change page to up
  changeUpPage() {
    //get all active btns
    const $change_btns = this.getActiveButtons();

    if (!$change_btns.length) {
      console.log("sin botones");
      return;
    }

    const lastButton = parseInt($change_btns[2].innerText);

    //change btn color depend of page
    if (this.page <= lastButton)
      this.changeBtnStyle($change_btns, this.current_page - 1);
    //reset current button to 1st one
    else this.resetButtons($change_btns);
  }

  //return all active buttons
  getActiveButtons() {
    return [...this.shadowRoot.querySelectorAll(".btn")].filter(
      (e) => e.style.display != "none"
    );
  }

  //reset buttons
  resetButtons($change_btns) {
    this.current_page = 1;
    this.changeBtnStyle($change_btns, 0);
    $change_btns.forEach((e, i) => {
      e.innerText =
        i === 0
          ? parseInt($change_btns[$change_btns.length - 1].innerText) + 1
          : parseInt($change_btns[0].innerText) + i;
    });
  }

  //CHANGE THE COLOR AND STYLE OF ELEMENTS

  changeBtnStyle(elements, index) {
    elements.forEach((e, i) => {
      let isCurrentBtn = i === index;
      e.style.backgroundColor = isCurrentBtn
        ? "var(--orange_primary)"
        : "var(--white_primary)";
      e.style.color = isCurrentBtn
        ? "var(--white_primary)"
        : "var(--black_primary)";
    });
  }

  decrement() {
    //decrement button until limin
    this.current_page -= 1;
    //decrement page until init
    this.page = this.page <= 1 ? 1 : this.page - 1;
    console.table({ page: this.page, current_page: this.current_page });
  }

  //return all buttons whith .hide class
  get allBtns() {
    return [...this.shadowRoot.querySelectorAll(".hide")];
  }
  //this function generate buttons depends of the total of api pages
  generateButtons() {
    this.total_pages > 4
      ? this.hideOshowbtns("flex") //if there are more than 4 pages
      : this.hideOshowbtns("none"); //if there are less than

    this.totalBtns();
  }
  // hide or show btns with class hide
  hideOshowbtns(display) {
    this.allBtns.map((btn) => {
      btn.style.display = display;
    });
  }
  //function that calculates the total of buttons
  totalBtns() {
    const btns = this.allBtns.filter((e) => e.style.display === "flex");
    //remove initilal buttons 1 ... and total_pages
    this.total_buttons = btns.length + 1 > 6 ? btns.length + 1 - 4 : 1;
    console.log(this.total_buttons, this.total_pages);
  }
}

customElements.define("c-page", C_Page);
