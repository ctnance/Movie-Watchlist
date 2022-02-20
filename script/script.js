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
  let pTag = resultsContainer.querySelector("p");
  if (resultsContainer.classList.contains("no-data")) {
    pTag.textContent = "Searching...";
  }
  // Get Movie Data
  searchMovieData(searchText);
}

async function searchMovieData(searchText) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`
  );
  const data = await response.json();
  if (data.Response !== "False") {
    // Query for results container then clear HTML content and remove no data class and add movie list
    let movieContainer = document.querySelector(".results");
    movieContainer.innerHTML = "";
    movieContainer.classList.remove("no-data");
    movieContainer.classList.add("movie-list");
    console.log(data);
    if (data.Response !== "False") {
      let moviesList = data.Search;
      moviesList.forEach((movie) => {
        getMovieData(movie.imdbID);
      });
      return true;
    } else {
      return false;
    }
  }
}

async function getMovieData(movieID) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`
  );
  const movieData = await response.json();
  if (movieData) {
    console.log(movieData);
    createMovieCard(movieData);
  }
}

function createMovieCard(movie) {
  let movieContainer = document.querySelector(".movie-list");
  let movieCard = createElement("div", movieContainer, "movie-card");
  // Create movie poster with img
  let moviePoster = createElement("div", movieCard, "movie-poster");
  let posterImg = createElement("img", moviePoster, "poster-image");
  posterImg.src = movie.Poster;
  posterImg.alt = `Movie Poster for ${movie.Title}`;

  // Create Movie details container
  let movieDetails = createElement("div", movieCard, "movie-details");

  // Create first row with title and ratings
  let rowOne = createElement("div", movieDetails, "row-one");
  let movieTitle = createElement("h2", rowOne, "movie-title");
  movieTitle.textContent = movie.Title;
  let movieRating = createElement("p", rowOne, "movie-rating");
  movieRating.textContent = `⭐ ${movie.imdbRating}`;

  // Create second row with runtime, genre and add-to-watchlist button
  let rowTwo = createElement("div", movieDetails, "row-two");
  let movieRuntime = createElement("p", rowTwo, "movie-runtime");
  movieRuntime.textContent = movie.Runtime;
  let movieGenre = createElement("p", rowTwo, "movie-genre");
  movieGenre.textContent = movie.Genre;
  let watchlistAddBtn = createElement("button", rowTwo, "add-to-watchlist-btn");
  watchlistAddBtn.onclick = addMovieToWatchlist(movie);
  watchlistAddBtn.innerHTML = `<span><img src="./images/plus-icon.svg" alt=""></span> Watchlist`;
  //   `<button onclick="addMovieToWatchlist${movie}>
  //   <span><img src="./images/plus-icon.svg" alt=""></span>Watchlist
  // </button>`;

  let rowThree = createElement("div", movieDetails, "row-three");
  let movieDescription = createElement("p", rowThree, "movie-description");
  let movieDescriptionText = movie.Plot;
  if (movie.Plot.length > 150) {
    movieDescriptionText = movie.Plot.slice(0, 150) + "...";
    console.log("UPDATED");
    movieDescription.innerHTML += `${movieDescriptionText}<button class="read-more-btn">Read more</button>`;
  } else {
    movieDescription.textContent = movieDescriptionText;
  }
}

function addMovieToWatchlist(movie) {
  console.log(movie);
}

// REMOVE API KEY BEFORE COMMIT!!!!!!!!!!!!!!!!!!
// AND THIS MESSAGE TOO!!!
