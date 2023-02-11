import * as App from "../app/app";
import { getFilm, getFilmsWithFilters, getPremieres } from "../kinopoiskAPI/controller";
import { handleRoute } from "../router/router";

function homePage(): void {
   App.showPage(createHomePage)
}

function createHomePage(): HTMLElement {
   const mainElement = document.createElement('main');
   const container = document.createElement('div');

   const date = new Date();
   const month = date.toLocaleString("en-US", { month: "long" });
   const year = date.getFullYear();

   mainElement.className = 'main';
   mainElement.append(container);
   container.className = 'container';

   getPremieres(year.toString(), 'JANUARY').then(data => {
      const dataArr = (data as respPremieres).items;
      const dataFiltered = dataArr.filter((el) => el.nameRu);
      createMainPoster(container, dataFiltered);
      createSection(container, 'Премьеры', dataArr);
   });

   const filtersNew: argumentForFilmSearch = {
      filmsOrder: 'RATING',
      yearFrom: year - 1,
      yearTo: year,
      page: 1,
   };

   getFilmsWithFilters(filtersNew).then(data => {
      const dataArr = (data as respfilmsWithFilters).items;
      const dataFiltered = dataArr.filter((el) => el.genres[0].genre !== 'музыка');
      createSection(container, 'Новинки', dataFiltered);
   });

   const filtersSeries: argumentForFilmSearch = {
      // country,
      // genres,
      filmsOrder: 'RATING',
      filmsType: 'TV_SERIES',
      // ratingFrom,
      // ratingTo,
      yearFrom: year - 15,
      // yearTo: year,
      // imdbId,
      // keyword,
      page: 1,
   };

   getFilmsWithFilters(filtersSeries).then(data => {
      const dataArr = (data as respfilmsWithFilters).items;
      createSection(container, 'Лучшие сериалы', dataArr);
   });

   const filtersFamily: argumentForFilmSearch = {
      genres: 7,
      filmsOrder: 'RATING',
      filmsType: 'FILM',
      yearFrom: year - 20,
      page: 1,
   };

   getFilmsWithFilters(filtersFamily).then(data => {
      const dataArr = (data as respfilmsWithFilters).items;
      createSection(container, 'Приключения для всей семьи', dataArr);
   });

   return mainElement;
}

function createMainPoster(block: HTMLElement, dataArr: respFilmItem[]): void {
   const rand = Math.floor(Math.random() * dataArr.length);
   const film = dataArr[rand];

   const greeting = document.createElement('div');
   block.append(greeting);
   greeting.className = 'greeting';
   greeting.style.background = `linear-gradient(90deg, rgba(3,5,17,1) 15%, rgba(3,5,17,0.8) 35%, rgba(3,5,17,0) 80%, rgba(3,5,17,0.8) 100%), url(${film.posterUrl}) center/cover`;

   getFilm(film.kinopoiskId.toString()).then(film => {
      const data = film as respFilm;
      const greetingInfo = document.createElement('div');
      const greetingTitle = document.createElement('h2');
      const greetingDesc = document.createElement('p');
      const greetingParams = document.createElement('p');

      greeting.append(greetingInfo);
      greetingInfo.className = 'greeting__info';

      greetingInfo.append(greetingTitle);
      greetingTitle.className = 'greeting__title';
      greetingTitle.textContent = data.nameRu;

      greetingInfo.append(greetingDesc);
      greetingDesc.className = 'greeting__desc';
      if (data.description) {
         const desc = data.description.slice(0, 150);
         greetingDesc.textContent = `${desc}...`;
      }

      greetingInfo.append(greetingParams);
      greetingParams.className = 'greeting__params';
      if (data.year) greetingParams.textContent = `${data.year}`;
      if (data.genres[0].genre) greetingParams.textContent += ` • ${data.genres[0].genre}`;
      if (data.ratingAgeLimits) greetingParams.textContent += ` • ${data.ratingAgeLimits.slice(3)}+`;
   })
}

function createSection(block: HTMLElement, title: string, dataArr: respFilmItem[]): void {
   const data = dataArr.filter((el) => 
      (el.nameRu || el.nameEn) && (el.posterUrl || el.posterUrlPreview) && el.year && el.genres[0].genre);
   console.log(data);

   const section = document.createElement('section');
   const sectionTitle = document.createElement('h2');
   const sectionItems = document.createElement('div');

   block.append(section);
   section.className = 'section';
   section.append(sectionTitle);
   sectionTitle.textContent = title;
   section.append(sectionItems);
   sectionItems.className = 'section__items';

   for (let i = 0; i < 6; i++) {
      const film = data[i];

      const poster = document.createElement('div');
      const posterImg = document.createElement('img');
      const posterTitle = document.createElement('p');
      const posterDesc = document.createElement('p');
      
      const moviePath = `/movie?${film.kinopoiskId}`;
      sectionItems.append(poster);
      poster.className = 'section__poster';
      poster.addEventListener('click', () => {
         handleRoute(moviePath);
      });

      poster.append(posterImg);
      posterImg.className = 'poster__img';
      if (film.posterUrlPreview) posterImg.src = film.posterUrlPreview;
      else posterImg.src = film.posterUrl;

      poster.append(posterTitle);
      posterTitle.className = 'poster__title';
      if (film.nameRu) posterTitle.textContent = film.nameRu;
      else posterTitle.textContent = film.nameEn;

      poster.append(posterDesc);
      posterDesc.className = 'poster__desc';
      posterDesc.textContent = `${film.year}, ${film.genres[0].genre}`;
   }
}

export default homePage;
