import "../css/utils/brand.css";
import "../components/header";
import "../components/modal";
import MovieApi from "./movie_api";

const API = new MovieApi();

// CONSULTAR TODAS LAS PELICULAS EN TENDENCIA
API.query_params = "trending/movie/week";
console.log(API.url);

API.getAllData().then((movies) => {
  console.log(movies.results);
  console.log(API.get_data_keys(movies));
  console.log(API.get_data_keys(movies.results[0]));
});

// CONSULTAR PELICULAS QUE COINCIDAN CON ALGUNA BUSQUEDA

API.query_params = `search/movie`;
console.log(API.url);

API.query = "robots"; //buscar peliculas de robots
API.getAllData().then((movies) => {
  console.log(movies);
  console.log(API.get_data_keys(movies));
  console.log(API.get_data_keys(movies.results[0]));
});
//RECUERDA BORRAR LA BUSQUEDA PARA NO TENER PROBLEMAS MAS ADELANTE
API.query = "";

// CONSULTAR INFORMACION DE UNA SOLA PELICULA
API.query_params = "movie/9928";
API.getAllData().then((movie) => {
  console.log(movie);
  console.log(API.get_data_keys(movie));
});

// OBTENER GENEROS O GENERO ESPECIFICO

API.get_Genre().then((data) => {
  console.log(data);
  console.log(data.get(878));
});

// OBTENER EL NOMBRE DE UN GENERO
API.get_Genre().then((dataG) => {
  API.query_params = "trending/movie/week";
  API.getAllData().then((data) => {
    data.results.map((movie) => {
      const { title, genre_ids } = movie;
      console.log(
        `Pelicula: ${title}, Generos: ${genre_ids.map((gen) => dataG.get(gen))}`
      );
    });
  });
});
