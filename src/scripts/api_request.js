import axios from "axios";

const config = {
  api_key: "d9b50eb87c44c0faed349508e17a23e7",
  api_base_url: "https://api.themoviedb.org/3/",
  image_base_url: "https://image.tmdb.org/t/p/w500",
  movie_id: "315162",
};

const getGeneralMovies = async () => {
  try {
    const response = await axios.get(
      `${config.api_base_url}discover/movie?api_key=${config.api_key}&language=es`
    );
    const data = await response.data;
    return data.results;
  } catch (error) {
    alert("Sorry,error");
  }
};

const getGeneresMovies = async () => {
  try {
    const response = await axios.get(
      `${config.api_base_url}genre/movie/list?api_key=${config.api_key}&language=es`
    );
    const data = await response.data;
    //console.log(data.genres);
    return data;
  } catch (error) {
    alert("Sorry,error");
  }
};

const getMovie = async () => {
  try {
    const response = await axios.get(
      `${config.api_base_url}movie/${config.movie_id}?api_key=${config.api_key}&language=es`
    );
    const data = await response.data;
    console.log(data);
    return data
  } catch (error) {
    alert("Sorry, error");
  }
};



export{getGeneralMovies,getGeneresMovies,getMovie}


