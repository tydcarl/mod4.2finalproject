//GRABBING ELEMENTS FROM HTML

const moviesWrapper = document.querySelector(".movie-grid");
const searchName = document.querySelector(".searchName");

//GLOBAL MOVIES VARIABLE

let currentMovies = [];

//HANDLING THE SEARCH

function searchChange(event) {
  renderMovies(event.target.value);
  searchName.innerHTML = event.target.value;
}
// REDNERING MOVIES CALLING API

async function renderMovies(searchTerm) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=485a0dbd&s=${searchTerm}`
  );
  moviesWrapper.classList += ' movies__loading'
  const data = await response.json();
  moviesWrapper.classList.remove(" movies__loading");
  currentMovies = data.Search;
  displayMovies(currentMovies);
}

function handleSearchIcon() {
  const searchIcon = document.querySelector(".fa-magnifying-glass");
  const spinner = document.querySelector("spinner__loading");

  spinner.style.display = "block";
  searchIcon.style.display = "none";
}

// DISPLAYING MOVIES
function displayMovies(movieList) {
  moviesWrapper.innerHTML = movieList
    .slice(0, 6)
    .map((movie) => {
      return `
    <div class="movie">
    <img src=${movie.Poster} alt="" />
    <h2>${movie.Title}</h2>
    <h4>${movie.Year}</h4>
    <button>Learn More</button>
    </div>
    `;
    })
    .join("");
}

//SORTING MOVIES

function sortChange(event) {
  const sortOption = event.target.value;

  let sortedMovies = [...currentMovies];

  if (sortOption === "newest") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  } else if (sortOption === "oldest") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }

  displayMovies(sortedMovies);
}
