const container = document.getElementById('filtro-generos');
container.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.closest('button')) {
    container.querySelector('.btn--active')?.classList.remove('btn--active');

    //adding active class to clickec btn
    e.target.classList.add('btn--active');
  }
});
