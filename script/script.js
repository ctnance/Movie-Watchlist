const API_KEY = ""; // Key is blank for security purposes; any valid key can be placed here
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function createElement(elementTag, parent, className) {
  let element = document.createElement(elementTag);
  element.className = className;
  parent.appendChild(element);
  return element;
}

function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
  let searchText = e.target[0].value;
  if (searchText) {
    searchForMovies(searchText);
  }
}

function searchForMovies(searchText) {
  // Show search in progress in p tag in results div
  let resultsContainer = document.querySelector(".results");
  if (resultsContainer.classList.contains("no-data")) {
    let pTag = resultsContainer.querySelector("p");
    pTag.textContent = "Searching...";
  }
  // Get Movie Data
  getMovieData(searchText);
}

async function getMovieData(searchText) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`
  );
  const data = await response.json();
  if (data) {
    // Query for results container then clear HTML content and remove no data class and add movie list
    let movieContainer = document.querySelector(".results");
    movieContainer.innerHTML = "";
    movieContainer.classList.remove("no-data");
    movieContainer.classList.add("movie-list");
    console.log(data);
    parseMovies(data.Search);
  }
}

function parseMovies(movieList) {
  movieList.forEach((movie) => {
    console.log(movie);
    // createMovieCard(movie);
  });
}
