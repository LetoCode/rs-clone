import * as App from "../app/app";
import { addElement } from "../utils/elementsBuilder";
import { createPoster } from "./components/poster";
import { filmsDataset, filmsGenresDataset } from "./datasets/listsData";

let pageNumber = 1;
let pagesCount = 1000;

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
      // btnLists.addEventListener('click', () => createLists(listsContainer, page));
      btnLists.addEventListener('click', () => createLists(listsContainer, filmsDataset));
      btnGenres.addEventListener('click', () => createLists(listsContainer, filmsGenresDataset));
   }

   return mainElement;
}

function createLists(container: HTMLElement, dataset: dataset<listTOP> | dataset<listFilms>): void {
   container.innerHTML = '';
   Object.values<listTOP | listFilms>(dataset).forEach(list => {
      createListsItem(container, list);
   });
}

function createListsItem(container: HTMLElement, list: listTOP | listFilms): void {
   const listsItem = addElement('div', 'lists__item list');
   const listHeading = addElement('h2', 'list__heading', list.title);
   // const listAmount = addElement('p', 'list__amount', `${list.amount} фильмов`);

   container.append(listsItem);
   // listsItem.append(listHeading, listAmount);
   listsItem.append(listHeading);

   listsItem.addEventListener('click', () => showList(container, listsItem, list), { once: true });
}

function showList(container: HTMLElement, listsItem: HTMLElement, list: listTOP | listFilms): void {
   pageNumber = 1;
   container.innerHTML = '';
   container.append(listsItem);
   listsItem.classList.add('list');

   const listItems = addElement('div', 'list__items');
   const listControls = addElement('div', 'list__controls');
   const btnPrev = addElement('button', 'btn btn__prev', 'Назад');
   const btnNext = addElement('button', 'btn btn__next', 'Вперед');

   listsItem.append(listItems);

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
   // let data: respTop | respfilmsWithFilters;
   let arrData: respFilmItem[];

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
      let data: respfilmsWithFilters;
      const listData = list as listFilms;

      if (storage === null) {
         data = await listData.getData({
            genres: listData.argums.genres,
            filmsOrder: 'RATING',
            filmsType: listData.argums.filmsType,
            page: pageNumber}) as respfilmsWithFilters;
         sessionStorage.setItem(`${list.name}-${pageNumber}`, JSON.stringify(data));
      } else {
         data = JSON.parse(storage);
      }

      arrData = data.items;
      pagesCount = data.totalPages;
   }
   arrData.forEach(film => {
      createPoster(block, film)
   });
};

export default filmsOrSeriesPage;
