import fetchPopulars from './fetchPopulars';
import chargingTittles from './chargingTittles';
import loadGenres from './loadGenres';
import './typeFilter';
import './listenerGenFilters';
import './listenerFind';
import './pagination';
import './listenerItems';
import './listenerPopUp';

//Contacting the server
const loading = async () => {
  const results = await fetchPopulars();
  chargingTittles(results);
  loadGenres('movie');
};

loading();
