import axios from "axios";

export default class MovieApi {
  #KEY = "ed37685745c320007af4ce01a66210eb";
  #query_params = "";
  #base_url = "https://api.themoviedb.org/3/";

  #options = {
    method: "get",
    url: "",
    params: {
      language: "es",
      page: "1",
      include_adult: true,
      query: "",
    },
  };

  constructor() {}

  async get_Genre() {
    this.query_params = "genre/movie/list";
    const res = await axios.get(this.url);
    return await new Map(
      res.data.genres.map((genre) => [genre.id, genre.name])
    );
  }

  set query(query) {
    this.#options.params.query = query;
  }

  set option_params(params) {
    this.#options.params = params;
  }
  get option_params() {
    return this.#options.params;
  }

  get options() {
    return this.#options;
  }

  get query_params() {
    return this.#query_params;
  }

  set url(new_url) {
    this.#options.url = `${this.#base_url}${new_url}?api_key=${this.#KEY}`;
  }
  get url() {
    return this.#options.url;
  }

  get page() {
    return this.#options.params.page;
  }
  set page(page) {
    this.#options.params.page = page;
  }

  set query_params(query_params) {
    this.#query_params = query_params;
    this.url = `${this.#query_params}`;
  }

  get_data_keys(obj) {
    return Object.keys(obj);
  }

  get_total_pages(data) {
    return "total_pages" in data ? data.total_pages : -1;
  }

  async getAllData() {
    try {
     
      const response = await axios(this.#options);
      response.onload = function (){
        console.log("fin")
      }
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
