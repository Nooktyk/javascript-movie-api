const apiKey="d018a7918c9908f6ab77232e64a84795";
let year="2022";
const url=`
https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&year=${year}`

const content = document.getElementById('content');
const urlPoster = `https://image.tmdb.org/t/p/w500/`;

const dropdown = document.getElementById('year');

async function displayMovies(url){
    const response = await fetch(url);
    const movies = await response.json();

    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    movies.results.forEach(data => {
        const movieelement = document.createElement('div');
        movieelement.classList.add('movie');
        const title = document.createElement('h2');
        const poster = document.createElement('img');
        title.innerHTML = `${data.title.substring(0,24)}`;
        poster.src = `${urlPoster}${data.poster_path}`;
        movieelement.appendChild(title);
        movieelement.appendChild(poster);
        content.appendChild(movieelement);
    });
}

dropdown.addEventListener('change',()=>{
    year = dropdown.value;
    const updateurl = `
https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&year=${year}`
    displayMovies(updateurl);
});

displayMovies(url);