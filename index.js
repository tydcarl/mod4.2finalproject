async function main() {

const users = await fetch("https://www.omdbapi.com/?apikey=485a0dbd&s=fast")
const usersData = await users.json(); 
 console.log(usersData);
}

main(); 