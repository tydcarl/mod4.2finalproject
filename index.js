async function main() {

const users = await fetch("https://www.omdbapi.com/?apikey=485a0dbd&s=fast");
const usersData = await users.json(); 
 console.log(
   usersData.map(
     (user) => `    <div class="container">
        <h2>Search Results</h2>
        <div id="movie-results" class="movie-grid"></div>
      </div>`
   )
 );
 
}

main(); 