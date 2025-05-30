const movieResults = document.getElementById("movie-results");

async function main() {
  const users = await fetch("https://www.omdbapi.com/?apikey=485a0dbd&s=fast");
  const usersData = await users.json();
  console.log(usersData.Search);

  movieResults.innerHTML = usersData.Search.map((movie) => {
    return `
        <div class="movie-card">
          <div class="movie-poster">
            <img src="${movie.Poster}" alt="${movie.Title} Poster" onerror="this.onerror=null;this.src='https://placehold.co/200x300/cccccc/333333?text=No+Image';">
          </div>
          <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        </div>
        `;
  });
}

main();
