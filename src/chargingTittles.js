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

export default chargingTittles;
