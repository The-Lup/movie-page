import fetchGenres from './fetchGenres';
import getGenres from './getGenres';

const fetchFind = async (page = 1) => {
  const type = document.querySelector('.main__filtros .btn--active')?.id;
  const genreId =
    document.querySelector('#filtro-generos .btn--active')?.dataset.id || '';
  const initialYear = document.getElementById('años-min').value || 1950;
  const finalYear = document.getElementById('años-max').value || 2024;

  let url;

  if (type === 'movie') {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=da70fb845a8b3dc87d9a2b5b2089b552&include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${initialYear}-01-01&primary_release_date.lte=${finalYear}-12-31&&sort_by=popularity.desc&with_genres=${genreId}`;
  } else if (type === 'tv') {
    url = `https://api.themoviedb.org/3/discover/tv?api_key=da70fb845a8b3dc87d9a2b5b2089b552&include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${initialYear}-01-01&primary_release_date.lte=${finalYear}-12-31&&sort_by=popularity.desc&with_genres=${genreId}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    const genres = await fetchGenres();
    results.forEach((result) => {
      result.genre = getGenres(result.genre_ids[0], genres);
    });

    return results;
  } catch (e) {
    console.log(e);
  }
};

export default fetchFind;
