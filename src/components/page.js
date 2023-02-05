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

        .hide {
          display: none;
        }
        .disabled {
          pointer-events: none;
          opacity: 0.5;
          background-color: red;
        }
        li.active {
          background-color: var(--orange_primary);
          color: var(--white_primary);
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
          <li id="init" class="active">1</li>
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
    this.current_page = Math.min(++this.current_page, this.total_pages);

    this.page =
      this.page >= this.total_pages ? this.total_pages : this.page + 1;
    this.changeUpPage();
  }
  //change page to up
  changeUpPage() {
    //get all active btns
    const $change_btns = this.getActiveButtons();
    const lastButton = parseInt($change_btns[2].innerText);

    if (!$change_btns.length) {
      console.log("sin botones");
      return;
    }

    if (this.page <= lastButton)
      //change btn color depend of page
      this.changeBtnStyle($change_btns, this.current_page - 1);
    //reset current button to 1st one
    else {
      this.resetButtons($change_btns);
    }

    //LO QUE INTENTO HACER AQUI ES OBTENER EL ULTIMO BOTON
    //PARA SABER SI ESTOY EN EL ULTIMO BOTON
    // const currentBtn = parseInt(
    //   $change_btns[this.current_page - 2].innerText
    // );
    // console.log(currentBtn);
    // const $last_btn = this.shadowRoot.querySelector("[type='next']");
    // if (this.lastButton === this.total_pages - 1) {
    //   if (this.lastButton.classList.contains("active")) {
    //     $last_btn.classList.add("disabled");
    //   }
    // }
  }

  //return all active buttons
  getActiveButtons() {
    return [...this.shadowRoot.querySelectorAll(".btn")].filter(
      (e) => e.style.display != "none"
    );
  }

  //reset buttons
  resetButtons($change_btns) {
    console.log("reseteando botones");
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

  changeBtnStyle(elements, current) {
    elements.forEach((e, i) => {
      let isCurrentBtn = i === current;
      isCurrentBtn ? e.classList.add("active") : e.classList.remove("active");
    });

    const isLastActiveButton =
      current === elements.length - 1 &&
      elements[current].classList.contains("active") &&
      parseInt(elements[current].innerText) === this.total_pages - 1;

    if (isLastActiveButton) {
      this.shadowRoot.querySelector("[type='next']").classList.add("disabled");
    }
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
