import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

const search = {
  genUrl() {
    let category = DOM.getTags();
    let randomPage = 1;
    let ramdonCategory = null;

    if (category.length > 0) {
      if (category.length == 4) {
        ramdonCategory = Math.floor(Math.random() * 3);
        switch (ramdonCategory) {
          case 0:
            randomPage = Math.floor(Math.random() * 500) + 1;
            break;
          case 1:
            randomPage = Math.floor(Math.random() * 15) + 1;
            break;
          case 2:
            randomPage = Math.floor(Math.random() * 500) + 1;
            break;
          case 3:
            randomPage = Math.floor(Math.random() * 90) + 1;
            break;
        }
      }
      if (category.length == 3) {
        ramdonCategory = Math.floor(Math.random() * 2);

        category.forEach((element) => {
          if (element == "popular") {
            randomPage = Math.floor(Math.random() * 500) + 1;
          } else if (element == "upcoming") {
            randomPage = Math.floor(Math.random() * 15) + 1;
          } else if (element == "top_rated") {
            randomPage = Math.floor(Math.random() * 500) + 1;
          } else if (element == "now_playing") {
            randomPage = Math.floor(Math.random() * 90) + 1;
          }
        });
      }
      if (category.length == 2) {
        ramdonCategory = Math.floor(Math.random() * 1);

        category.forEach((element) => {
          if (element == "popular") {
            randomPage = Math.floor(Math.random() * 500) + 1;
          } else if (element == "upcoming") {
            randomPage = Math.floor(Math.random() * 15) + 1;
          } else if (element == "top_rated") {
            randomPage = Math.floor(Math.random() * 500) + 1;
          } else if (element == "now_playing") {
            randomPage = Math.floor(Math.random() * 90) + 1;
          }
        });
      }
      if (category.length == 1) {
        ramdonCategory = 0;

        category.forEach((element) => {
          if (element == "popular") {
            randomPage = Math.floor(Math.random() * 500) + 1;
          } else if (element == "upcoming") {
            randomPage = Math.floor(Math.random() * 15) + 1;
          } else if (element == "top_rated") {
            randomPage = Math.floor(Math.random() * 500) + 1;
          } else if (element == "now_playing") {
            randomPage = Math.floor(Math.random() * 90) + 1;
          }
        });
      }
    } else {
      category = ["popular", "upcoming", "top_rated", "now_playing"];
      ramdonCategory = Math.floor(Math.random() * 3);

      switch (ramdonCategory) {
        case 0:
          randomPage = Math.floor(Math.random() * 500) + 1;
          break;
        case 1:
          randomPage = Math.floor(Math.random() * 15) + 1;
          break;
        case 2:
          randomPage = Math.floor(Math.random() * 500) + 1;
          break;
        case 3:
          randomPage = Math.floor(Math.random() * 90) + 1;
          break;
      }
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
          rate: item.vote_average,
        };
      });
    }

    let moviesArrayFiltered = [];
    if (moviesArrayMaped.length > 0) {
      moviesArrayFiltered = moviesArrayMaped.filter((item) => {
        if (
          item.title &&
          item.overview &&
          item.img_path &&
          item.year &&
          item.rate
        ) {
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
        rate: moviesArrayFiltered[randomIndex].rate,
      };
    } else {
      app.newSearch();
    }
    return movie;
  },
};

const DOM = {
  getTags() {
    const popular = document.querySelector("#popular");
    const upcoming = document.querySelector("#upcoming");
    const top_rated = document.querySelector("#top_rated");
    const now_playing = document.querySelector("#now_playing");
    let tags = [];
    if (popular.checked == true) {
      tags.push("popular");
    }
    if (upcoming.checked == true) {
      tags.push("upcoming");
    }
    if (top_rated.checked == true) {
      tags.push("top_rated");
    }
    if (now_playing.checked == true) {
      tags.push("now_playing");
    }
    return tags;
  },
  insertMovie(movie) {
    const { title, year, overview, img_path, rate } = movie;

    const html = `
       <div class="img-container">
         <img class="img" src="${IMG_URL + img_path}" alt="" />
         <span class="year">${year}</span>
         <span class="rate">${rate}<i class="fas fa-star"></i></span>
       </div>
           <div class="content-movie">
             <span class="titleMovie">${title}</span>
             <div class="description">${overview}</div>
           </div>
      `;
    let containerMovie = document.querySelector(".movie");
    containerMovie.innerHTML = html;
  },
  removeMovie() {
    let containerMovie = document.querySelector(".movie");
    containerMovie.innerHTML = "";
  },
  addLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-ative");
  },
  removeLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.remove("loader-ative");
  },
};

// Application

const app = {
  init() {
    const button = document.querySelector("#finder-movie-trigger");
    button.addEventListener("click", app.newSearch);
  },
  async newSearch() {
    DOM.removeMovie();
    DOM.addLoader();
    const movies = await search.fetchMovies();
    if (movies) {
      DOM.insertMovie(search.getMovie(movies));
      DOM.removeLoader();
    }
  },
};

app.init();
