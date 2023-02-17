import { addPagination, FILMS_ON_PAGE, showFilmPageWithPagination } from "../person";

export async function buttonProfClick(
   e: Event,
   filmsForButton: personsFilm[],
   personFilms: HTMLElement,
): Promise<void> {

   const oldActiveButton: HTMLElement = document.querySelector('.person-film__btn._active') as HTMLElement;
   oldActiveButton.classList.remove('_active');
   const button: HTMLElement = e.currentTarget as HTMLElement;
   button.classList.add('_active');
   personFilms.innerHTML = '';
   await showFilmPageWithPagination(filmsForButton, personFilms, 1);
   console.log('FILMS_ON_PAGE', FILMS_ON_PAGE)
   console.log('filmsForButton', filmsForButton)
   if (FILMS_ON_PAGE < filmsForButton.length) {
      addPagination(filmsForButton, personFilms, 1);
   }
}

export async function changePaginationPage(
   this: HTMLElement,
   paginationContainer: HTMLElement,
   currentFilms: personsFilm[],
   personFilms: HTMLElement,
   page: number): Promise<void> {

   console.log('this', this)
   console.log('paginationContainer', paginationContainer)
   console.log('currentFilms', currentFilms)
   console.log('personFilms', personFilms)
   console.log('page', page)

   const oldActiveEl: HTMLElement = paginationContainer.querySelector('._active') as HTMLElement;
   oldActiveEl.classList.remove('_active');
   this.classList.add('_active');
   personFilms.innerHTML = '';
   await showFilmPageWithPagination(currentFilms, personFilms, page);
   addPagination(currentFilms, personFilms, page);
}