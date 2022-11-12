import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

const search = {
  genUrl() {
    const category = ["popular", "upcoming", "top_rated", "now_playing"];
    const ramdonCategory = Math.floor(Math.random() * 3);

    let randomPage = 1;
    switch (ramdonCategory) {
      case 0:
        randomPage = Math.floor(Math.random() * 500) + 1;
        break;
      case 1:
        randomPage = Math.floor(Math.random() * 20) + 1;
        break;
      case 2:
        randomPage = Math.floor(Math.random() * 500) + 1;
        break;
      case 3:
        randomPage = Math.floor(Math.random() * 90) + 1;
        break;
    }

    const url = `${BASE_URL}${category[ramdonCategory]}?api_key=${API_KEY}&${language}&page=${randomPage}`;

    return url;
  },
  async fetchMovies() {
    const response = await fetch(search.genUrl());
    const movies = await response.json();
    return movies;
  },
  getMovie(movies) {
    // console.log(movies);
    const moviesArray = movies.results;
    let moviesArrayFiltered = [];
    moviesArray.forEach((element) => {
      if (
        element.overview.length > 0 &&
        element.title.length > 0 &&
        element.poster_path.length > 0
      ) {
        moviesArrayFiltered.push(element);
      }
    });

    const randomIndex = Math.floor(Math.random() * moviesArrayFiltered.length);
    const movie = {
      title: moviesArrayFiltered[randomIndex].title,
      year: new Date(
        moviesArrayFiltered[randomIndex].release_date
      ).getFullYear(),
      overview: moviesArrayFiltered[randomIndex].overview,
      img_path: moviesArrayFiltered[randomIndex].poster_path,
    };
    // console.log(moviesArrayFiltered);
    // console.log(movie);
    return movie;
  },
  insertHTML(movie) {
    const { title, year, overview, img_path } = movie;

    // console.log(year, overview, title, img_path);
    const html = `
       <div class="img-container">
         <img class="img" src="${IMG_URL + img_path}" alt="" />
         <span class="year">${year}</span>
       </div>
           <div class="content-movie">
             <span class="titleMovie">${title}</span>
             <div class="description">${overview}</div>
           </div>
      `;
    let containerMovie = document.querySelector(".movie");
    containerMovie.innerHTML = html;
  },
};

function init() {
  const button = document.querySelector("#finder-movie-trigger");
  button.addEventListener("click", newSearch);
}

async function newSearch() {
  const movies = await search.fetchMovies();
  search.insertHTML(search.getMovie(movies));
}

init();
