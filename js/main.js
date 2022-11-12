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
    let moviesArrayMaped = [];
    if (movies.results.length > 0) {
      moviesArrayMaped = movies.results.map((item) => {
        return {
          title: item.title,
          overview: item.overview,
          img_path: item.poster_path,
          year: item.release_date,
        };
      });
    }

    let moviesArrayFiltered = [];
    if (moviesArrayMaped.length > 0) {
      moviesArrayFiltered = moviesArrayMaped.filter((item) => {
        if (item.title && item.overview && item.img_path && item.year) {
          return item;
        }
      });
    }

    const randomIndex = Math.floor(Math.random() * moviesArrayFiltered.length);
    let movie = {};
    if (moviesArrayFiltered.length > 0) {
      movie = {
        title: moviesArrayFiltered[randomIndex].title,
        year: new Date(moviesArrayFiltered[randomIndex].year).getFullYear(),
        overview: moviesArrayFiltered[randomIndex].overview,
        img_path: moviesArrayFiltered[randomIndex].img_path,
      };
    } else {
      newSearch();
    }
    return movie;
  },
  insertHTML(movie) {
    const { title, year, overview, img_path } = movie;

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
  if (movies) {
    search.insertHTML(search.getMovie(movies));
  }
}

init();
