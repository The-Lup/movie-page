import fetchItems from './fetchItems';

const container = document.getElementById('populares');
const popUp = document.getElementById('media');

container.addEventListener('click', async (e) => {
  if (e.target.closest('.main__media')) {
    //Activating popUp window
    popUp.classList.add('media--active');

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
