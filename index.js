document.querySelector('.movie-button').addEventListener('click', () => {
  movieList(movieUrl);
});
document.querySelector('.series-button').addEventListener('click', () => {
  movieList(tvUrl);
});
document.querySelector('.search-button').addEventListener('click', () => {
  searchFunction();
});

const apiKey = 'api_key=0f72d2cd1bcb0405976854583ec7b20e';
const baseUrl = 'https://api.themoviedb.org/3';
const movieUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const tvUrl = baseUrl + '/discover/tv?sort_by=popularity.desc&' + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const searchUrl = baseUrl + '/search/multi?' + apiKey;
const container = document.getElementById('cont');
const searchInput = document.getElementById('search-input');

function movieList(url) {

  fetch(url)
  .then(res => res.json())
  .then(data => {
    displayMovies(data.results);
  })
}

function displayMovies(data) {
  container.innerHTML = '';
  data.forEach(movie => {
    const {title, poster_path} = movie;
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('col');
    movieInfo.innerHTML = `
    
        <img src="${imgUrl+poster_path}" width=300px>
        
        <div class="movie-title">
          <h4>${title}</h4>
        </div>           
    
    `
    container.appendChild(movieInfo);
  })
}

function searchFunction() {

  const searchText = searchInput.value;

  if(searchText) {
    movieList(searchUrl + '&query=' + searchText)
  }
}