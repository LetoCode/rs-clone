import { showFilmPageWithPagination } from "../person";

export async function buttonProfClick(
   e: Event,
   filmsForButton: personsFilm[],
   personFilms: HTMLElement,
): Promise<void> {

   console.log('click')
   const oldActiveButton: HTMLElement = document.querySelector('.person-film__btn._active') as HTMLElement;
   oldActiveButton.classList.remove('_active');
   const button: HTMLElement = e.currentTarget as HTMLElement;
   button.classList.add('_active');
   console.log('filmsForButton=', filmsForButton)
   personFilms.innerHTML = '';
   await showFilmPageWithPagination(filmsForButton, personFilms, 1);
}

// export function buttonActorsClick(e: Event, filmStaff: FilmStaffItem[], actorsItems: HTMLElement): void {
//    const button: HTMLElement = e.currentTarget as HTMLElement;
//    console.log(button)
//    if (button.classList.contains('actors__btn_actors')) {
//       if (!button.classList.contains('_active')) {
//          button.classList.add('_active');
//          document.querySelector('.actors__btn_creators')?.classList.remove('_active');
//          actorsItems.innerHTML = '';
//          const actors: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'ACTOR');
//          embedStaffCards(actors, actorsItems);
//       }
//    }
//    if (button.classList.contains('actors__btn_creators')) {
//       button.classList.add('_active');
//       document.querySelector('.actors__btn_actors')?.classList.remove('_active');
//       actorsItems.innerHTML = '';
//       const creators: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() !== 'ACTOR');
//       embedStaffCards(creators, actorsItems);

//    }
// }