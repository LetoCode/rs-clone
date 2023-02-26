import * as App from "../app/app";
import { getFilm, getFilmsWithFilters, getPremieres, getTOP250 } from "../kinopoiskAPI/controller";
import { getNews } from "../newsAPI/newsController";
import { router } from "../router/router";
import { createNewsItem } from "./components/newsItem";
import { createPoster } from "./components/poster";

const MAX_NEWS = 5;
const MAIN_POSTER_BG = 'linear-gradient(90deg, rgba(3,5,17,1) 15%, rgba(3,5,17,0.8) 35%, rgba(3,5,17,0) 80%, rgba(3,5,17,0.8) 100%)';

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
      const storagePremieres = sessionStorage.getItem('premieres');
      const storageNewFilms = sessionStorage.getItem('new-1');
      const storageBestFilms = sessionStorage.getItem('top250-1');
      const storageBestSeries = sessionStorage.getItem('best-s-1');
      const storageAdventure = sessionStorage.getItem('adventures-1');
      const storageNews = sessionStorage.getItem('news');

      let dataPremieres: respPremieres;
      let dataNewFilms: respfilmsWithFilters;
      let dataBestFilms: respTop;
      let dataBestSeries: respfilmsWithFilters;
      let dataAdventure: respfilmsWithFilters;
      let dataNews: respNews;

      if (storagePremieres && storageNewFilms && storageBestFilms && storageBestSeries && storageAdventure && storageNews !== null) {
         dataPremieres = JSON.parse(storagePremieres);
         dataNewFilms = JSON.parse(storageNewFilms);
         dataBestFilms = JSON.parse(storageBestFilms);
         dataBestSeries = JSON.parse(storageBestSeries);
         dataAdventure = JSON.parse(storageAdventure);
         dataNews = JSON.parse(storageNews);
      } else {
         dataPremieres = await getPremieres(year.toString(), month) as respPremieres;
         dataNewFilms = await getFilmsWithFilters(filtersNewFilms) as respfilmsWithFilters;
         dataBestFilms = await getTOP250() as respTop;
         dataBestSeries = await getFilmsWithFilters(filtersBestSeries) as respfilmsWithFilters;
         dataAdventure = await getFilmsWithFilters(filtersAdventure) as respfilmsWithFilters;
         dataNews = await getNews() as respNews;

         sessionStorage.setItem('premieres', JSON.stringify(dataPremieres));
         sessionStorage.setItem('new-1', JSON.stringify(dataNewFilms));
         sessionStorage.setItem('top250-1', JSON.stringify(dataBestFilms));
         sessionStorage.setItem('best-s-1', JSON.stringify(dataBestSeries));
         sessionStorage.setItem('adventures-1', JSON.stringify(dataAdventure));
         sessionStorage.setItem('news', JSON.stringify(dataNews));
      }

      const arrPremieres: respFilmItem[] = dataPremieres.items.filter((el) => el.nameRu).slice(0, 30);
      const arrNewFilms: respFilmItem[] = dataNewFilms.items.filter((el) => el.genres[0].genre !== 'музыка');
      const arrBestFilms: respFilmItem[] = dataBestFilms.films;
      const arrBestSeries: respFilmItem[] = dataBestSeries.items.filter((el) => el.genres[0].genre !== 'мультфильм');
      const arrAdventure: respFilmItem[] = dataAdventure.items;

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
   const pathname = `/movie/${film.kinopoiskId}`;

   block.append(greeting);
   greeting.className = 'greeting';
   greeting.style.background = `${MAIN_POSTER_BG}, url(${film.posterUrl}) center center/cover`;
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
      if (data.genres && data.genres[0].genre) greetingParams.textContent += ` • ${data.genres[0].genre}`;
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
      dataNews.articles.sort(() => Math.random() - Math.random());
      const filteredDataNews: newsArticle[] = dataNews.articles.filter(el => el.author !== 'Goblin');
      for (let i = 0; i < Math.min(MAX_NEWS, filteredDataNews.length); i++) {
         createNewsItem(sectionItems, filteredDataNews[i]);
      }
      block.append(section);
   }
}

export default homePage;
