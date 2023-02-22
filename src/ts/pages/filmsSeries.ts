import * as App from "../app/app";
import { addElement } from "../utils/elementsBuilder";
import { createPoster } from "./components/poster";
import { filmsDataset, filmsGenresDataset, seriesGenresDataset } from "./datasets/listsData";

let pageNumber = 1;
let pagesCount = 1000;
const listAmount = addElement('p', 'list__amount');

function filmsOrSeriesPage(): void {
   App.showPage(createFilmsOrSeriesPage);
}

function createFilmsOrSeriesPage(): HTMLElement {
   const pathname = window.location.pathname;
   const page = pathname.replace('/', '');

   const mainElement = addElement('main', 'main');
   const container = addElement('div', 'container');
   const lists = addElement('div', 'lists');
   const listsNav = addElement('div', 'lists__nav');
   const btnLists = addElement('button', 'btn btn__lists-item', 'Списки');
   const btnGenres = addElement('button', 'btn btn__lists-item', 'Жанры');
   const btnCountries = addElement('button', 'btn btn__lists-item', 'Страны');
   const btnYears = addElement('button', 'btn btn__lists-item', 'Годы');
   const listsContainer = addElement('div', 'lists__container');

   mainElement.append(container);
   container.append(lists);
   lists.append(listsNav, listsContainer);
   listsNav.append(btnLists, btnGenres, btnCountries, btnYears);

   if (page === 'films') {
      btnLists.addEventListener('click', () => createLists(listsContainer, filmsDataset));
      btnGenres.addEventListener('click', () => createLists(listsContainer, filmsGenresDataset));
   } else {
      btnGenres.addEventListener('click', () => createLists(listsContainer, seriesGenresDataset));
   }

   return mainElement;
}

function createLists(container: HTMLElement, dataset: listTOP[] | listFilms[]): void {
   container.innerHTML = '';
   dataset.forEach(list => createListsItem(container, list));
}

function createListsItem(container: HTMLElement, list: listTOP | listFilms): void {
   const listsItem = addElement('div', 'lists__item list');
   const listHeading = addElement('h2', 'list__heading', list.title);

   container.append(listsItem);
   listsItem.append(listHeading);

   listsItem.addEventListener('click', () => showList(container, listsItem, list), { once: true });
}

function showList(container: HTMLElement, listsItem: HTMLElement, list: listTOP | listFilms): void {
   pageNumber = 1;
   container.innerHTML = '';
   container.append(listsItem);
   listsItem.classList.remove('list');
   listsItem.classList.add('list_active');

   const listItems = addElement('div', 'list__items');
   const listControls = addElement('div', 'list__controls');
   const btnPrev = addElement('button', 'btn btn__prev', 'Назад');
   const btnNext = addElement('button', 'btn btn__next', 'Вперед');

   listAmount.textContent = '';
   listsItem.append(listAmount, listItems);

   showPosters(listItems, list);

   listsItem.append(listControls);
   listControls.append(btnPrev, btnNext);

   btnNext.addEventListener('click', () => {
      if (pageNumber < pagesCount) {
         pageNumber++;
         showPosters(listItems, list);
      }
   });

   btnPrev.addEventListener('click', () => {
      if (pageNumber > 1) {
         pageNumber--;
         showPosters(listItems, list);
      }
   });
}

async function showPosters(block: HTMLElement, list: listTOP | listFilms) {
   block.innerHTML = '';
   const storage = sessionStorage.getItem(`${list.name}-${pageNumber}`);
   let arrData: respFilmItem[] | undefined;

   if (list.isTop) {
      let data: respTop;

      if (storage === null) {
         data = await (list as listTOP).getData(pageNumber) as respTop;
         sessionStorage.setItem(`${list.name}-${pageNumber}`, JSON.stringify(data));
      } else {
         data = JSON.parse(storage);
      }

      arrData = data.films;
      pagesCount = data.pagesCount;

   } else {
      let data: respfilmsWithFilters | undefined;
      const listData = list as listFilms;

      if (storage === null) {

         if (listData.argums.genres) {
            data = await listData.getData({
               genres: listData.argums.genres,
               filmsType: listData.argums.filmsType,
               page: pageNumber
            }) as respfilmsWithFilters;
         }

         if (listData.argums.country) {
            data = await listData.getData({
               country: listData.argums.country,
               filmsType: listData.argums.filmsType,
               page: pageNumber
            }) as respfilmsWithFilters;
         }

         if (listData.argums.yearFrom && listData.argums.yearTo) {
            data = await listData.getData({
               yearFrom: listData.argums.yearFrom,
               yearTo: listData.argums.yearTo,
               filmsType: listData.argums.filmsType,
               page: pageNumber
            }) as respfilmsWithFilters;
         }

         sessionStorage.setItem(`${list.name}-${pageNumber}`, JSON.stringify(data));
      } else {
         data = JSON.parse(storage);
      }

      if (data) {
         arrData = data.items;
         pagesCount = data.totalPages;
         listAmount.textContent = `Найдено: ${data.total}`;
      }
   }

   arrData?.forEach(film => {
      createPoster(block, film)
   });
};

export default filmsOrSeriesPage;
