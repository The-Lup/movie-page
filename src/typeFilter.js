import chargingTittles from './chargingTittles';
import fetchPopulars from './fetchPopulars';
import loadGenres from './loadGenres';

const movieFilter = document.getElementById('movie');
const serieFilter = document.getElementById('tv');

movieFilter.addEventListener('click', async (e) => {
  //loading genres at the sidebar
  loadGenres('movie');

  //response from server.
  const results = await fetchPopulars('movie');

  //chargin tittles in DOM
  chargingTittles(results);

  serieFilter.classList.remove('btn--active');
  movieFilter.classList.add('btn--active');
  document.querySelector('#populares .main__titulo').innerHTML =
    'Películas Populares';
});

serieFilter.addEventListener('click', async (e) => {
  e.preventDefault();

  //loading genres at the sidebar
  loadGenres('tv');

  //response from server.
  const results = await fetchPopulars('tv');

  //chargin tittles in DOM
  chargingTittles(results);

  movieFilter.classList.remove('btn--active');
  serieFilter.classList.add('btn--active');
  document.querySelector('#populares .main__titulo').innerHTML =
    'Series Populares';
});
