const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3aa47be1eb75133e874a9f2f307bdca9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3aa47be1eb75133e874a9f2f307bdca9&query="'

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main")
getMovies(API_URL);
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
        
        const movieEle = document.createElement("div");
        movieEle.classList.add('movie');

        movieEle.innerHTML = `
     
                <img src="${IMG_PATH + poster_path}" alt="${title}">
             <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVoteColor(vote_average)}">${vote_average}</span>
             </div>
             <div class="overview">
                <h3>Overview</h3>
                ${overview}
                 </div>
       
         
        `
        main.appendChild(movieEle);

    })
}

function getVoteColor(vote) {
    
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return "orange"
    }
    else {
        return "red"
    }
}
 
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const searchItem = search.value
    
    console.log(searchItem);

    if (searchItem && searchItem !== "") {
        getMovies(SEARCH_API + searchItem)

        search.value = ""
    } else {
        window.location.reload()
    }

    

})