const getGenres = (id, genres) => {
  let nameGenre;

  genres.forEach((element) => {
    if (id === element.id) {
      nameGenre = element.name;
    }
  });
  return nameGenre;
};

export default getGenres;
