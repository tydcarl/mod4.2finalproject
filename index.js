//GRABBING ELEMENTS FROM HTML

const moviesWrapper = document.querySelector(".movie-grid");
const searchInput = document.getElementById("searchbar"); // Get the search input element
const searchResultsHeading = document.querySelector(".search-results"); // Element to display search term
const searchButton = document.getElementById("search__btn");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const spinner = document.querySelector(".spinner__loading"); // Corrected selector

//GLOBAL MOVIES VARIABLE

let currentMovies = [];

//HANDLING THE SEARCH

function searchChange(event) {
  renderMovies(event.target.value);
  searchResultsHeading.innerHTML = `Search Results for: ${event.target.value}`;
}

// REDNERING MOVIES CALLING API

async function renderMovies(searchTerm) {
  // Show spinner and hide search icon
  searchIcon.style.display = "none";
  spinner.style.display = "block";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=485a0dbd&s=${searchTerm}`
    );
    const data = await response.json();
    currentMovies = data.Search || []; // Ensure currentMovies is an array even if no results
    displayMovies(currentMovies);
    if (currentMovies.length === 0) {
      moviesWrapper.innerHTML = "<p>No movies found for your search.</p>";
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesWrapper.innerHTML =
      "<p>Failed to load movies. Please try again later.</p>";
  } finally {
    // Hide spinner and show search icon
    spinner.style.display = "none";
    searchIcon.style.display = "block";
  }
}

// DISPLAYING MOVIES
function displayMovies(movieList) {
  moviesWrapper.innerHTML = movieList
    .slice(0, 6)
    .map((movie) => {
      // Check if poster is available, otherwise use a placeholder
      const poster =
        movie.Poster === "N/A"
          ? "https://via.placeholder.com/150x220?text=No+Poster"
          : movie.Poster;
      return `
    <div class="movie">
    <img src="${poster}" alt="${movie.Title} poster" />
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

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  renderMovies(searchTerm);
  searchResultsHeading.innerHTML = `Search Results for: ${searchTerm}`;
});

// Initial movie load when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderMovies("Avengers"); // Load some default movies
  searchResultsHeading.innerHTML = `Search Results for: Avengers`; // Set initial heading
});
