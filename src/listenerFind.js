import chargingTittles from './chargingTittles';
import fetchFind from './fetchFind';

const btn = document.getElementById('btn-buscar');
btn.addEventListener('click', async (e) => {
  const results = await fetchFind();
  chargingTittles(results);
});
