import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

const triggger = document.getElementById("finder-movie-trigger");
triggger.addEventListener("click", getMovie);
function getMovie() {
  const category = ["popular", "upcoming", "top_rated", "now_playing"];
  const ramdonCategory = Math.floor(Math.random() * 3);
  const randomNumber = Math.floor(Math.random() * 19);
  let randomPage = 1;
  switch (ramdonCategory) {
    case 0:
      randomPage = Math.floor(Math.random() * 500) + 1;
      break;
    case 1:
      randomPage = Math.floor(Math.random() * 31) + 1;
      break;
    case 2:
      randomPage = Math.floor(Math.random() * 500) + 1;
      break;
    case 3:
      randomPage = Math.floor(Math.random() * 98) + 1;
      break;
  }
  console.log(randomPage);
  console.log(ramdonCategory);

  const movie = fetch(
    `${BASE_URL}${category[ramdonCategory]}?api_key=${API_KEY}&${language}&page=${randomPage}`
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonBody) => {
      const overview = jsonBody.results[randomNumber].overview;
      const title = jsonBody.results[randomNumber].title;
      const img = IMG_URL + jsonBody.results[randomNumber].poster_path;

      const html = `
      <img class="img" src="${img}" alt="" />
          <div class="content-movie">
            <span class="titleMovie">${title}</span>
            <div class="description">${overview}</div>
          </div>
      `;

      let containerMovie = document.querySelector(".movie");
      containerMovie.innerHTML = html;
    });
}
