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

export default fetchItems;
