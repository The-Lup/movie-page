import fetchGenres from './fetchGenres';

const genreContainer = document.getElementById('filtro-generos');

const loadGenres = async (filter) => {
  const genres = await fetchGenres(filter);

  genreContainer.innerHTML = '';
  genres.forEach((genre) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = genre.name;
    btn.setAttribute('data-id', genre.id);
    genreContainer.appendChild(btn);
  });
};

export default loadGenres;
