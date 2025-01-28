import fetchGenres from './fetchGenres';
import getGenres from './getGenres';

const fetchPopulars = async (filter = 'movie') => {
  const type = filter === 'movie' ? 'movie' : 'tv';
  const url = `https://api.themoviedb.org/3/${type}/popular?api_key=da70fb845a8b3dc87d9a2b5b2089b552&language=es-ES&page=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    const genres = await fetchGenres();
    results.forEach((result) => {
      result.genre = getGenres(result.genre_ids[0], genres);
    });

    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export default fetchPopulars;
