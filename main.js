import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";

const movie = fetch(`${BASE_URL}80?api_key=${API_KEY}&${language}`)
  .then((response) => {
    return response.json();
  })
  .then((jsonBody) => {
    console.log(jsonBody);
  });

console.log(jsonBody[0]);
