const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`;
const IMGPATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f0149700
82a0088b1&query=`;
const main = document.querySelector("main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

async function getMovie(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results)
}
getMovie(APIURL);

function showMovies(movies) {
    //clear Data
    main.innerHTML = '';

    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt="">

        <div class="movie-info">
            <h3>${movie.original_title}</h3>
            <span class="${getColorByRate(movie.vote_average)}">${movie.vote_average}</span>
        </div>

        <div class="overview">
            <h4>Overview :</h4>
            <span>${movie.overview}</span>
        </div>
        `;
        main.appendChild(movieEl);
    });
}

function getColorByRate(rate) {
    if (rate >= 8) {
        return "green";
    } else if (rate >= 6) {
        return "orange";
    } else {
        return "red";
    }
}
form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = SEARCHAPI + search.value;
    if (searchTerm) {
        getMovie(SEARCHAPI + searchTerm);
        search.value = "";
    }

})