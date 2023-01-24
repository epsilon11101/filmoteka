import axios from "axios";

const KEY = "d9b50eb87c44c0faed349508e17a23e7";
//const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`;
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
let page = 1;
let resp;
const getMovies = async () => {
  try {
    const respuesta = await axios.get(`${URL}`);
    // statusValue(respuesta);
    resp = await respuesta.data.results;
  
    return resp;
  } catch (error) {
    alert(error.response.data.status_message);
  }
};

getMovies();
//console.log(data);
export default getMovies