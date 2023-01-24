import { LitElement } from "lit";
import axios from "axios";

export class GetData extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      metho: { tipe: String },
    };
  }

  firstUpdated() {
    this.getMovies()
  }
  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getMovies = async () => {
    try {
      const respuesta = await axios.get(this.url);
      // statusValue(respuesta);
      const resp = respuesta.data.results;
      this._sendData(resp);
      //const fecha = resp[0].release_date.split("-")[0];
    } catch (error) {
      alert(error);
    }
  };
}
customElements.define("get-data", GetData);
