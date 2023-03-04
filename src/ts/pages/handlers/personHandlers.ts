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

   const oldActiveEl: HTMLElement = paginationContainer.querySelector('._active') as HTMLElement;
   oldActiveEl.classList.remove('_active');
   this.classList.add('_active');
   personFilms.innerHTML = '';
   await showFilmPageWithPagination(currentFilms, personFilms, page);
   addPagination(currentFilms, personFilms, page);
}