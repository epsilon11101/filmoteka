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
    this.addEventListener("page-sent", this._handlePageSent);
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
          <li class="init active">1</li>
          <li class="hide" val="dot_left">...</li>
          <li class="btn-page hide btn">2</li>
          <li class="btn-page hide btn">3</li>
          <li class="btn-page hide btn">4</li>
          <li class="hide" val="dot_right">...</li>
          <li class="hide last">${this.total_pages}</li>
          <li type="next">-></li>
        </ul>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("page-sent", this._handleUpdateBtnsValues);
  }

  disconnectedCallback() {
    this.removeEventListener("page-sent");
  }

  _handleUpdateBtnsValues(e) {
    const btnIndex = e.detail.clicked_index;
    const isButton = ![0, 2, 6, 8].includes(btnIndex);

    if (!isButton) return;

    this.shadowRoot.querySelector("[type='prev']").classList.remove("disabled");
    this.shadowRoot.querySelector("[type='next']").classList.remove("disabled");

    const liElements = [...this.shadowRoot.querySelectorAll("li")];
    liElements.forEach((btn) => btn.classList.remove("active"));

    if (btnIndex === 1) {
      this.page = 1;
      this.current_page = 0;
      this.shadowRoot.querySelector("[type='prev']").classList.add("disabled");
    } else if (btnIndex === 7) {
      this.page = this.total_pages;
      this.current_page = 4;
      this.shadowRoot.querySelector("[type='next']").classList.add("disabled");
      this.setDecrement(this.getActiveButtons().reverse());
      this.shadowRoot.querySelector(".last").classList.add("active");
    } else {
      this.page = parseInt(e.detail.btnValue);
      switch (btnIndex) {
        case 3:
          this.current_page = 1;
          break;
        case 4:
          this.current_page = 2;
          break;
        case 5:
          this.current_page = 3;
          break;
      }
      liElements[btnIndex].classList.add("active");
    }
  }

  setDecrement(btns) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].innerText = this.total_pages - (i + 1);
    }
  }

  _handleSelecteElement(e) {
    const btn = e.target;
    const btnValue = btn.innerText;
    const isNumber = parseInt(btnValue);
    const liElements = this.shadowRoot.querySelectorAll("li");
    const clicked_index = [...liElements].indexOf(btn);

    if (btnValue === "...") {
      console.log(btn.attributes.val.value);
    } else if (isNumber) {
      this.page = isNumber;
      this.dispatchEvent(
        new CustomEvent("page-sent", {
          detail: { btnValue, clicked_index },
          bubbles: true,
        })
      );
    }
  }

  updatePage(isIncrement) {
    const selector = isIncrement ? "[type='prev']" : "[type='next']";
    const classToRemove = isIncrement ? ".init" : ".last";
    this.shadowRoot.querySelector(selector).classList.remove("disabled");
    this.shadowRoot.querySelector(classToRemove).classList.remove("active");
    this.current_page = isIncrement
      ? this.current_page <= 2
        ? this.current_page + 1
        : 0
      : this.current_page >= 0
      ? this.current_page - 1
      : 3;
    this.page = isIncrement
      ? this.page >= this.total_pages
        ? this.total_pages
        : this.page + 1
      : this.page <= 1
      ? 1
      : this.page - 1;
    this.changePage(isIncrement);
  }

  changePage(isUp) {
    const $change_btns = this.getActiveButtons();
    let $firstButton, $lastButton;

    if (!$change_btns.length) {
      console.log("sin botones");
      return;
    }

    if (isUp) {
      $lastButton = parseInt($change_btns[2].innerText);
      if (this.page <= $lastButton) {
        this.changeBtnStyle($change_btns, this.current_page - 1);
      } else {
        this.resetButtons($change_btns, "up");
      }
      const isLastPosition =
        $lastButton === this.page - 1 &&
        $change_btns[2].classList.contains("active");

      if (isLastPosition) {
        this.shadowRoot
          .querySelector("[type='next']")
          .classList.add("disabled");
        this.shadowRoot.querySelector(".last").classList.add("active");
        this.getActiveButtons()[2].classList.remove("active");
        this.current_page = 4;
      }
    } else {
      $firstButton = parseInt($change_btns[0].innerText);
      if (this.page >= $firstButton) {
        this.changeBtnStyle($change_btns, this.current_page - 1);
      } else {
        this.resetButtons($change_btns, "down");
      }
      const isFirstPosition =
        $firstButton - 1 === this.page &&
        $change_btns[0].classList.contains("active");

      if (isFirstPosition) {
        this.shadowRoot
          .querySelector("[type='prev']")
          .classList.add("disabled");
        this.shadowRoot.querySelector(".init").classList.add("active");
        this.getActiveButtons()[0].classList.remove("active");
        this.current_page = 0;
      }
    }
  }
  //return all active buttons
  getActiveButtons() {
    return [...this.shadowRoot.querySelectorAll(".btn")].filter(
      (e) => e.style.display != "none"
    );
  }

  //CHANGE THE COLOR AND STYLE OF ELEMENTS
  changeBtnStyle(elements, current) {
    elements.forEach((e, i) => {
      let isCurrentBtn = i === current;
      isCurrentBtn ? e.classList.add("active") : e.classList.remove("active");
    });
  }

  resetButtons($change_btns, direction) {
    if (
      (direction === "up" &&
        parseInt($change_btns[2].innerText) != this.total_pages - 1) ||
      (direction === "down" && parseInt($change_btns[0].innerText) != 2)
    ) {
      this.current_page = direction === "up" ? 1 : 3;
      this.changeBtnStyle($change_btns, direction === "up" ? 0 : 2);
      $change_btns.forEach((e, i) => {
        e.innerText =
          i === 0
            ? parseInt($change_btns[$change_btns.length - 1].innerText) +
              (direction === "up" ? 1 : -5)
            : parseInt($change_btns[0].innerText) + i;
      });
    }
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
  }

  restoreValues() {
    if (this.page <= 1) {
      console.log("restaurando valores");
      this.shadowRoot.querySelector(".init").classList.add("active");
      this.shadowRoot.querySelector("[type='prev']").classList.add("disabled");
      this.shadowRoot
        .querySelector("[type='next']")
        .classList.remove("disabled");
      this.page = 1;
      this.current_page = 0;

      [...this.shadowRoot.querySelectorAll(".active")].map((btn, i) => {
        if (i != 0) btn.classList.remove("active");
      });

      this.getActiveButtons().forEach((btn, i) => {
        btn.classList.remove("active");
        btn.innerText = i + 2;
      });
    }
  }
}

customElements.define("c-page", C_Page);
