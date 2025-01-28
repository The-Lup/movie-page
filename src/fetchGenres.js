const fetchGenres = async (filter = 'movie') => {
  const type = filter === 'movie' ? 'movie' : 'tv';
  const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=da70fb845a8b3dc87d9a2b5b2089b552&language=es-ES`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.genres;
  } catch (e) {
    console.log(e);
  }
};

export default fetchGenres;
