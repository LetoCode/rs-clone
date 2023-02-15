import { getFilmsByKeyWord } from "../kinopoiskAPI/controller";
import { createPoster } from "./components/poster";

export function showSearchResults(id: string): void {
   const mainElement = document.querySelector('.main');
   const container = document.createElement('div');
   const sectionItems = document.createElement('section');
   if (mainElement) {
      mainElement.innerHTML = '';
      mainElement.append(container);
   }
   container.className = 'container';
   container.append(sectionItems);
   sectionItems.className = 'section__items';

   (async () => {
      const filmsPageOne = (await getFilmsByKeyWord(id, 1) as FilmsByKeyWord).films;
      const filmsPageTwo = (await getFilmsByKeyWord(id, 2) as FilmsByKeyWord).films;
      const films = filmsPageOne.concat(filmsPageTwo).slice(0, 36);
      for (let i = 0; i < films.length; i++) {
         createPoster(sectionItems, films[i]);
      }
   })();
}
