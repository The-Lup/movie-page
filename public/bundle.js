'use strict';

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

const getGenres = (id, genres) => {
  let nameGenre;

  genres.forEach((element) => {
    if (id === element.id) {
      nameGenre = element.name;
    }
  });
  return nameGenre;
};

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

const chargingTittles = (results) => {
  const container = document.querySelector('#populares .main__grid');

  container.innerHTML = '';

  //adding movies based on server response
  results.forEach((result) => {
    const template = `
    <div class="main__media" data-id="${result.id}">
              <a href="#" class="main__media-thumb">
                <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${
                  result.poster_path
                } alt="" />
              </a>
              <p class="main__media-titulo">${result.title || result.name}</p>
              <p class="main__media-fecha">${result.genre}</p>
            </div>
      `;

    container.insertAdjacentHTML('beforeend', template);
  });
};

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

const container$1 = document.getElementById('filtro-generos');
container$1.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.closest('button')) {
    container$1.querySelector('.btn--active')?.classList.remove('btn--active');

    //adding active class to clickec btn
    e.target.classList.add('btn--active');
  }
});

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

const btn = document.getElementById('btn-buscar');
btn.addEventListener('click', async (e) => {
  const results = await fetchFind();
  chargingTittles(results);
});

const previousBtn = document.getElementById('pagina-anterior');
const nextBtn = document.getElementById('pagina-siguiente');

nextBtn.addEventListener('click', async (e) => {
  const actualPage = document.getElementById('populares').dataset.pagina;
  try {
    const result = await fetchFind(actualPage + 1);
    document
      .getElementById('populares')
      .setAttribute('data-pagina', parseInt(actualPage) + 1);
    chargingTittles(result);
    window.scrollTo(0, 0);
  } catch (e) {
    console.log(e);
  }
});

previousBtn.addEventListener('click', async (e) => {
  const actualPage = document.getElementById('populares').dataset.pagina;

  if (actualPage > 1) {
    try {
      const result = await fetchFind(actualPage - 1);
      document
        .getElementById('populares')
        .setAttribute('data-pagina', parseInt(actualPage) - 1);
      chargingTittles(result);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  }
});

const fetchItems = async (id) => {
  const type = document.querySelector('.main__filtros .btn--active').id;

  try {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=da70fb845a8b3dc87d9a2b5b2089b552&language=es-ES`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

const container = document.getElementById('populares');
const popUp$1 = document.getElementById('media');

container.addEventListener('click', async (e) => {
  if (e.target.closest('.main__media')) {
    //Activating popUp window
    popUp$1.classList.add('media--active');

    const id = e.target.closest('.main__media').dataset.id;

    //response from server
    const result = await fetchItems(id);

    //showing results on screen
    const template = `
         <div class="media__backdrop">
            <img
              src="https://image.tmdb.org/t/p/w500/${result.backdrop_path}"
              class="media__backdrop-image"
            />
          </div>
          <div class="media__imagen">
            <img
              src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
              class="media__poster"
            />
          </div>
          <div class="media__info">
            <h1 class="media__titulo">${result.title || result.name}</h1>
            <p class="media__fecha">${
              result.release_date || result.first_air_date
            }</p>
            <p class="media__overview">${result.overview}</p>
          </div>
          <button class="media__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              class="media__btn-icono"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </button>
    `;

    document.querySelector('#media .media__contenedor').innerHTML = template;
  }
});

const popUp = document.getElementById('media');

popUp.addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    popUp.classList.remove('media--active');
  }
});

//Contacting the server
const loading = async () => {
  const results = await fetchPopulars();
  chargingTittles(results);
  loadGenres('movie');
};

loading();
//# sourceMappingURL=bundle.js.map
