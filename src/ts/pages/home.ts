import * as App from "../app/app";
import { getFilm, getFilmsWithFilters, getPremieres } from "../kinopoiskAPI/controller";
import { getNews } from "../newsAPI/newsController";
import { router } from "../router/router";
import { createNewsItem } from "./components/newsItem";
import { createPoster } from "./components/poster";

const MAX_NEWS = 5;

function homePage(): void {
   App.showPage(createHomePage);
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

   const filtersNewFilms: argumentForFilmSearch = {
      filmsOrder: 'RATING',
      yearFrom: year - 1,
      yearTo: year,
      page: 1,
   };

   const filtersBestFilms: argumentForFilmSearch = {
      filmsOrder: 'RATING',
      filmsType: 'FILM',
      page: 1,
   };

   const filtersBestSeries: argumentForFilmSearch = {
      filmsOrder: 'RATING',
      filmsType: 'TV_SERIES',
      page: 1,
   };

   const filtersAdventure: argumentForFilmSearch = {
      genres: 7,
      filmsOrder: 'RATING',
      filmsType: 'FILM',
      page: 1,
   };

   (async () => {
      const dataPremieres = await getPremieres(year.toString(), month) as respPremieres;
      const dataNewFilms = await getFilmsWithFilters(filtersNewFilms) as respfilmsWithFilters;
      const dataBestFilms = await getFilmsWithFilters(filtersBestFilms) as respfilmsWithFilters;
      const dataBestSeries = await getFilmsWithFilters(filtersBestSeries) as respfilmsWithFilters;
      const dataAdventure = await getFilmsWithFilters(filtersAdventure) as respfilmsWithFilters;
      const dataNews: respNews = await getNews() as respNews;
      console.log('news', dataNews)

      const arrPremieres = dataPremieres.items.filter((el) => el.nameRu).slice(0, 30);
      const arrNewFilms = dataNewFilms.items.filter((el) => el.genres[0].genre !== 'музыка');
      const arrBestFilms = dataBestFilms.items.filter((el) => el.genres[0].genre !== 'мультфильм');
      const arrBestSeries = dataBestSeries.items.filter((el) => el.genres[0].genre !== 'мультфильм');
      const arrAdventure = dataAdventure.items;

      createMainPoster(container, arrPremieres);
      createNewsSection(container, 'Актуально', dataNews);
      createSection(container, 'Премьеры', arrPremieres);
      createSection(container, 'Новинки', arrNewFilms);
      createSection(container, 'Лучшие фильмы', arrBestFilms);
      createSection(container, 'Лучшие сериалы', arrBestSeries);
      createSection(container, 'Приключения для всей семьи', arrAdventure);
   })();

   return mainElement;
}

function createMainPoster(block: HTMLElement, dataArr: respFilmItem[]): void {
   const greeting = document.createElement('div');

   const rand = Math.floor(Math.random() * dataArr.length);
   const film = dataArr[rand];
   const pathname = `/movie?${film.kinopoiskId}`;

   block.append(greeting);
   greeting.className = 'greeting';
   greeting.style.background = `linear-gradient(90deg, rgba(3,5,17,1) 15%, rgba(3,5,17,0.8) 35%, rgba(3,5,17,0) 80%, rgba(3,5,17,0.8) 100%), url(${film.posterUrl}) center/cover`;
   greeting.addEventListener('click', (event) => {
      event.preventDefault();
      router(pathname);
   });

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
   const films = data.sort(() => Math.random() - 0.5);

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
      createPoster(sectionItems, films[i]);
   }
}

function createNewsSection(block: HTMLElement, title: string, dataNews: respNews) {
   if (dataNews.totalResults) {
      const section = document.createElement('section');
      const sectionTitle = document.createElement('h2');
      const sectionItems = document.createElement('div');

      section.className = 'section section_news';
      section.append(sectionTitle);
      sectionTitle.textContent = title;
      section.append(sectionItems);
      sectionItems.className = 'section__items_news';
      for (let i = 0; i < MAX_NEWS; i++) {
         createNewsItem(sectionItems, dataNews.articles[i]);
      }

      block.append(section);
   }
}

export default homePage;
