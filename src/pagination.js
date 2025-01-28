import chargingTittles from './chargingTittles';
import fetchFind from './fetchFind';

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
