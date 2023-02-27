import { embedStaffCards } from "../movie";

export function showAllSeasons(e: Event): void {
   const serial: HTMLElement = document.querySelector('.serial') as HTMLElement;
   const button: HTMLElement = e.currentTarget as HTMLElement;
   serial.classList.toggle('_hidden');
   button.textContent = serial.classList.contains('_hidden') ? 'Показать все' : 'Скрыть все';
}

export function buttonActorsClick(e: Event, filmStaff: FilmStaffItem[], actorsItems: HTMLElement): void {
   const button: HTMLElement = e.currentTarget as HTMLElement;
   if (button.classList.contains('actors__btn_actors')) {
      if (!button.classList.contains('_active')) {
         button.classList.add('_active');
         document.querySelector('.actors__btn_creators')?.classList.remove('_active');
         actorsItems.innerHTML = '';
         const actors: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'ACTOR');
         embedStaffCards(actors, actorsItems);
      }
   }
   if (button.classList.contains('actors__btn_creators')) {
      button.classList.add('_active');
      document.querySelector('.actors__btn_actors')?.classList.remove('_active');
      actorsItems.innerHTML = '';
      const creators: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() !== 'ACTOR');
      embedStaffCards(creators, actorsItems);
   }
}

export function showAllReview(this: HTMLElement, reviewItemBody: HTMLElement): void {
   reviewItemBody.classList.toggle('_hidden');
   this.textContent = reviewItemBody.classList.contains('_hidden') ? 'Показать всю рецензию' : 'Спрятать';
}