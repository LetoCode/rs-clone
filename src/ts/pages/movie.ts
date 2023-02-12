import * as App from "../app/app";
import * as Controller from "../kinopoiskAPI/controller";
import { router } from "../router/router";
import { addCard, addElement, addMenuElement, addTableRow } from "../utils/elementsBuilder";
import { RATING_SVG_IMDB, RATING_SVG_KP } from "./components/ratingCircle";
import { showAllSeasons } from "./handlers/movieHandlers";

const MAX_REVIEWS: number = 5;
const MAX_FILM_IMGS: number = 5;
const MAX_ACTORS: number = 5;
const RATING_100: number = 250;

const youtubeFrame = (endpoint: string): string => {
   return ` <iframe src = "https://www.youtube.com/embed/${endpoint}" title = "YouTube video player" frameborder = "0" 
   allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
   picture-in-picture; web-share" allowfullscreen > </iframe>`};

const kinopoiskFrame = (endpoint: string): string => {
   return `<iframe is="x-frame-bypass" src="${endpoint}"></iframe>`;
}

function moviePage(): void {
   App.showPage(createMoviePage)
}

function createMoviePage(): HTMLElement {
   const id: string = window.location.search.replace('?', '');
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';

   (async () => {
      const filmFilters: respFilters = await Controller.getFilters() as respFilters;
      //const filmData: respFilm = await Controller.getFilm('77044') as respFilm;
      const filmData: respFilm = await Controller.getFilm(id) as respFilm;
      if (!filmData) router('/404');
      const filmVideos: respVideos = await Controller.getVideos(id) as respVideos;
      const filmImages: respImages = await Controller.getImages(id, 1, 'STILL') as respImages;
      const filmStaff: FilmStaffItem[] = await Controller.getStaff(id) as FilmStaffItem[];
      const filmBoxOffice: respBoxOffice = await Controller.getBoxOffice(id) as respBoxOffice;
      const filmDistributions: respDistributions = await Controller.getDistributions(id) as respDistributions;
      //!TODO Change then
      // const filmFacts: respFacts = await Controller.getFacts(id) as respFacts;
      // const filmFacts: respFacts = await Controller.getFacts('326') as respFacts;
      // //!TODO Change then
      // //const filmReviews: respReviews = await Controller.getReviews(id, 1, 'USER_POSITIVE_RATING_DESC') as respReviews;
      // const filmReviews: respReviews = await Controller.getReviews('77044', 1, 'USER_POSITIVE_RATING_DESC') as respReviews;
      // //const filmSimilar: respSimilars = await Controller.getSimilars(id) as respSimilars;
      // const filmSimilar: respSimilars = await Controller.getSimilars('77044') as respSimilars;
      //const film1: respfilmsWithFilters = await Controller.getFilmsWithFilters({ keyword: 'друзья', page: 1 }) as respfilmsWithFilters;

      console.log('filmData =', filmData)
      // console.log('filmVideos =', filmVideos)
      // console.log('filmImages =', filmImages)
      // console.log('filmStaff =', filmStaff)
      // console.log('filmBoxOffice =', filmBoxOffice)
      // console.log('filmDistributions =', filmDistributions)
      // console.log('filmDFacts =', filmFacts)
      // console.log('filmReviews =', filmReviews)
      // console.log('filmSimilar =', filmSimilar)
      // console.log('filmFilters =', filmFilters)
      const movieContainer: HTMLElement = addElement('div', 'container movie');

      const asideMenu: HTMLElement = addElement('nav', 'aside-menu');
      const asideList: HTMLElement = addElement('ul', 'aside-menu__list');
      asideMenu.append(asideList);

      const topBlock: DocumentFragment = getTopBlock(filmData, filmStaff, filmBoxOffice, filmDistributions, filmFilters, filmImages, asideList);
      movieContainer.append(topBlock);

      const [bodyBlock, leftAside, rightBody]: [DocumentFragment, HTMLElement, HTMLElement] = getBodyBlock();
      movieContainer.append(bodyBlock);

      if (filmVideos.total > 0) {
         const trailerBlock: DocumentFragment = getTrailerBlock(filmVideos, asideList);
         rightBody.append(trailerBlock);
      }

      //if (filmData.serial) {
      //!TODO Change then
      const filmSeasons: respSeasons = await Controller.getSeasons('77044') as respSeasons;
      //const filmSeasons: respSeasons = await Controller.getSeasons(id) as respSeasons;
      console.log(filmSeasons);
      if (filmSeasons.total) {
         const serialsBlock: DocumentFragment = getSeasonsBlock(filmSeasons, asideList);
         rightBody.append(serialsBlock);
      }
      //}

      // const actorsBlock: DocumentFragment = getActorsBlock(filmStaff, asideList);
      // rightBody.append(actorsBlock);

      // const aboutBlock: DocumentFragment = getAboutBlock(filmData, filmFacts, asideList);
      // rightBody.append(aboutBlock);

      // if (filmReviews.total) {
      //    const reviewsBlock: DocumentFragment = getReviewsBlock(filmReviews, asideList);
      //    rightBody.append(reviewsBlock);
      // }
      // if (filmImages.total) {
      //    const imagesBlock: DocumentFragment = getImagesBlock(filmImages, asideList);
      //    rightBody.append(imagesBlock);
      // }

      // if (filmSimilar.total) {
      //    const similarBlock: DocumentFragment = getSimilarBlock(filmSimilar, asideList);
      //    rightBody.append(similarBlock);
      // }

      leftAside.append(asideMenu);
      mainElement.append(movieContainer);

   })();

   return mainElement;
}

function getTopBlock(
   filmData: respFilm,
   filmStaff: FilmStaffItem[],
   filmBoxOffice: respBoxOffice,
   filmDistributions: respDistributions,
   filmFilters: respFilters,
   filmImages: respImages,
   asideList: HTMLElement): DocumentFragment {

   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__top top', '', [{ attr: 'name', attrValue: 'filmName' }]);
   asideList.append(addMenuElement('Фильм', '#filmName'));
   if (filmImages.total) {
      const randomImageIndex = Math.floor(Math.random() * filmImages.total);
      const topImage: HTMLElement = addElement('div', 'top__image');
      topImage.style.backgroundImage = `url("${filmImages.items[randomImageIndex].imageUrl}")`
      el.appendChild(topImage);
   } else {
      const topImage: HTMLElement = addElement('div', 'top__image');
      topImage.style.backgroundImage = `url("${filmData.posterUrl}")`
      el.appendChild(topImage);
   }

   const topBlock: HTMLElement = addElement('div', 'top__block');
   const topPoster: HTMLElement = addElement('div', 'top__poster');
   const topInfo: HTMLElement = addElement('div', 'top__info info');
   embedPoster(topPoster, filmData);
   embedTopInfo(topInfo, filmData, filmStaff, filmBoxOffice, filmDistributions, filmFilters);

   if (filmData.ratingImdb || filmData.ratingKinopoisk) {
      const topRatingItems: HTMLElement = addElement('div', 'top__rating-items rating-items');
      if (filmData.ratingImdb) {
         const ratingImdbContainer: HTMLElement = addElement('div', 'rating__imdb');
         const ratingImdbCircle: HTMLElement = addElement('div', 'rating__imdb-circle', RATING_SVG_IMDB);
         const circleImdb: HTMLElement = ratingImdbCircle.querySelector('.circle') as HTMLElement;
         const percentImdb: number = filmData.ratingImdb / 10;
         circleImdb.style.strokeDashoffset = `${RATING_100 - percentImdb * RATING_100}`;
         const ratingImdbNumber: HTMLElement = addElement('div', 'rating-number', String(filmData.ratingImdb));
         const ratingImdbHeader: HTMLElement = addElement('div', 'rating-header', 'IMDb');
         ratingImdbContainer.append(ratingImdbCircle, ratingImdbNumber, ratingImdbHeader);
         topRatingItems.append(ratingImdbContainer);
      }
      if (filmData.ratingKinopoisk) {
         const ratingKpContainer: HTMLElement = addElement('div', 'rating__kp');
         const ratingKpCircle: HTMLElement = addElement('div', 'rating__kp-circle', RATING_SVG_KP);
         const circleKp: HTMLElement = ratingKpCircle.querySelector('.circle') as HTMLElement;
         const percentKp: number = filmData.ratingKinopoisk / 10;
         circleKp.style.strokeDashoffset = `${RATING_100 - percentKp * RATING_100}`;
         const ratingKpNumber: HTMLElement = addElement('div', 'rating-number', String(filmData.ratingKinopoisk));
         const ratingKpHeader: HTMLElement = addElement('div', 'rating-header', 'KP');
         ratingKpContainer.append(ratingKpCircle, ratingKpNumber, ratingKpHeader);
         topRatingItems.append(ratingKpContainer);
      }
      topInfo.append(topRatingItems);
   }

   topBlock.append(topPoster, topInfo);

   el.appendChild(topBlock);
   fragment.appendChild(el);
   return fragment;
}

function getBodyBlock(): [DocumentFragment, HTMLElement, HTMLElement] {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'body-block');
   const left: HTMLElement = addElement('div', 'body-block-left');
   const right: HTMLElement = addElement('div', 'body-block-right');

   el.append(left, right);
   fragment.appendChild(el);
   return [fragment, left, right];
}

function getActorsBlock(filmStaff: FilmStaffItem[], asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__actors actors', '', [{ attr: 'name', attrValue: 'filmActors' }]);
   asideList.append(addMenuElement('Создатели', '#filmActors'));

   const actorsBlock: HTMLElement = addElement('div', 'actors__block');
   const actorsMenu: HTMLElement = addElement('div', 'actors__menu block-menu');
   const actorsItems: HTMLElement = addElement('div', 'actors__items');
   actorsBlock.append(actorsMenu, actorsItems);

   const buttonActors: HTMLElement = addElement('button', 'btn actors__btn', 'Актеры', [{ attr: 'type', attrValue: 'button' }]);
   const buttonCreators: HTMLElement = addElement('button', 'btn actors__btn', 'Создатели', [{ attr: 'type', attrValue: 'button' }]);
   const buttonGroup1: HTMLElement = addElement('div', 'btn-group-actors');
   buttonGroup1.append(buttonActors, buttonCreators);
   const buttonGroup2: HTMLElement = addElement('div', 'btn-group-actors');
   const buttonAll: HTMLElement = addElement('button', 'btn actors__btn actors__btn_all _addition', 'Смотреть всех', [{ attr: 'type', attrValue: 'button' }]);
   buttonGroup2.append(buttonAll);
   actorsMenu.append(buttonGroup1, buttonGroup2);

   const actors: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'ACTOR');
   //const creators: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'ACTOR' || el.professionKey.toUpperCase() === 'DIRECTOR');
   for (let i = 0; i < Math.min(MAX_ACTORS, actors.length); i += 1) {
      try {
         const card: HTMLElement = addCard('actors__item', actors[i].posterUrl, actors[i].nameRu, actors[i].professionText);
         actorsItems.append(card);
      } catch (e) {
         console.log(`Don't get staff card ${e}`);
      }
   }

   el.appendChild(actorsBlock);
   fragment.appendChild(el);
   return fragment;
}

function getTrailerBlock(filmVideos: respVideos, asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__trailer trailer', '', [{ attr: 'name', attrValue: 'filmTrailer' }]);
   asideList.append(addMenuElement('Трейлер', '#filmTrailer'));

   const menu: HTMLElement = addElement('div', 'trailer__menu block-menu');
   const button: HTMLElement = addElement('button', 'btn trailer__btn _active', 'Трейлер', [{ attr: 'type', attrValue: 'button' }]);
   menu.append(button);

   const youTubeIdx = filmVideos.items.findIndex(el => el.site.toLocaleUpperCase() === 'YOUTUBE');
   if (youTubeIdx >= 0) {
      const youTubeEndpoint: string = filmVideos.items[youTubeIdx].url.split('?v=')[1];
      if (youTubeEndpoint) {
         el.innerHTML = youtubeFrame(youTubeEndpoint);
         fragment.appendChild(el);
         el.insertAdjacentElement('beforebegin', menu);
         return fragment;
      }
   }
   const kinopoiskWidgetIdx = filmVideos.items.findIndex(el => el.site.toLocaleUpperCase() === 'KINOPOISK_WIDGET');
   if (kinopoiskWidgetIdx >= 0) {
      const kinopoiskEndpoint: string = filmVideos.items[kinopoiskWidgetIdx].url;
      el.innerHTML = kinopoiskFrame(kinopoiskEndpoint);
      fragment.appendChild(el);
      el.insertAdjacentElement('beforebegin', menu);
      return fragment;
   }

   return fragment;
}


function getAboutBlock(filmData: respFilm, filmFacts: respFacts, asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__about about', '', [{ attr: 'name', attrValue: 'filmAbout' }]);
   asideList.append(addMenuElement('О фильме', '#filmAbout'));

   if (filmData.description) {
      const header: HTMLElement = addElement('h4', 'about__header', 'О фильме');
      const content: HTMLElement = addElement('p', 'about__content', filmData.description);
      el.append(header, content);
   }
   if (filmFacts.total) {
      const facts: respFactsItem[] = filmFacts.items.filter(el => el.text.toUpperCase() === 'FACT');
      const bugs: respFactsItem[] = filmFacts.items.filter(el => el.text.toUpperCase() === 'BLOOPER');
      if (facts.length) {
         const factsElementContainer: HTMLElement = addElement('div', 'about__facts facts');
         const factsHeader: HTMLElement = addElement('h5', 'facts__header', 'Факты о фильме');
         factsElementContainer.append(factsHeader);
         for (const fact of facts) {
            const factElement: HTMLElement = addElement('p', 'facts__item', fact.text);
            factsElementContainer.append(factElement);
         }
         el.append(factsElementContainer);
      }
      if (bugs.length) {
         const bugsElementContainer: HTMLElement = addElement('div', 'about__bugs bugs');
         const bugsHeader: HTMLElement = addElement('h5', 'bugs__header', 'Ошибки и баги');
         bugsElementContainer.append(bugsHeader);
         for (const bug of bugs) {
            const bugElement: HTMLElement = addElement('p', 'bugs__item', bug.text);
            bugsElementContainer.append(bugElement);
         }
         el.append(bugsElementContainer);
      }
   }
   fragment.appendChild(el);
   return fragment;
}


function getSeasonsBlock(filmSeasons: respSeasons, asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__serial serial _hidden', '', [{ attr: 'name', attrValue: 'filmSeasons' }]);
   asideList.append(addMenuElement('Сезоны', '#filmSeasons'));

   const serialContainer: HTMLElement = addElement('div', 'serial__container');
   const serialHeader: HTMLElement = addElement('div', 'serial__header', `Всего вышло сезонов ${filmSeasons.total}`);
   for (const season of filmSeasons.items) {
      const seasonsContainer: HTMLElement = addElement('div', 'seasons__container');
      const seasonsHeader: HTMLElement = addElement('div', 'seasons__header', `Сезон ${season.number}`);
      const seasonsSubtitle: HTMLElement = addElement('div', 'seasons__subtitle', `Эпизодов ${season.episodes.length}`);
      const episodesContainer: HTMLElement = addElement('div', 'episodes__container');
      seasonsContainer.append(seasonsHeader, seasonsSubtitle, episodesContainer);
      for (const episode of season.episodes) {
         const episodeContainer: HTMLElement = addElement('div', 'episode__container');
         const namesContainer: HTMLElement = addElement('div', 'episode__names');
         const episodeNumber: HTMLElement = addElement('p', 'episode__number episode', `Эпизод ${episode.episodeNumber}`);
         const episodeHeader: HTMLElement = addElement('p', 'episode__header episode', `${episode.nameRu}`);
         namesContainer.append(episodeNumber, episodeHeader);
         if (episode.nameEn) {
            const episodeHeaderEn: HTMLElement = addElement('p', 'episode__headerEn episode', `${episode.nameEn}`);
            namesContainer.append(episodeHeaderEn);
         }

         const dateContainer: HTMLElement = addElement('div', 'episode__date-container');
         const releaseDate: string = new Date(episode.releaseDate).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
         const episodeDate: HTMLElement = addElement('p', 'episode__date episode', `${releaseDate}`);
         dateContainer.append(episodeDate);
         episodeContainer.append(namesContainer, dateContainer);
         episodesContainer.append(episodeContainer);
      }
      serialContainer.append(seasonsContainer);
   }
   const buttonShowAll: HTMLElement = addElement('button', 'btn btn__show-all-series', 'Показать все', [{ attr: 'type', attrValue: 'button' }]);
   buttonShowAll.onclick = showAllSeasons;
   el.append(serialHeader, serialContainer, buttonShowAll);
   fragment.appendChild(el);
   return fragment;
}


function getReviewsBlock(filmReviews: respReviews, asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__reviews reviews', '', [{ attr: 'name', attrValue: 'filmReviews' }]);
   asideList.append(addMenuElement('Рецензии', '#filmReviews'));

   const reviewsContainer: HTMLElement = addElement('div', 'reviews__container');
   const reviewsItems: HTMLElement = addElement('div', 'reviews__items');
   const reviewsTotal: HTMLElement = addElement('div', 'reviews__total');

   const positive: respReviewItem[] =
      filmReviews.items.filter(el => el.type.toUpperCase() === 'POSITIVE')
         .sort((a, b) => a.positiveRating - b.positiveRating);
   const negative: respReviewItem[] =
      filmReviews.items.filter(el => el.type.toUpperCase() === 'POSITIVE')
         .sort((a, b) => a.negativeRating - b.negativeRating);

   const maxPositive: number = Math.min(MAX_REVIEWS, positive.length);
   const maxNegative: number = Math.min(MAX_REVIEWS, negative.length);

   embedReviews(reviewsItems, positive, maxPositive, 'positive');
   embedReviews(reviewsItems, negative, maxNegative, 'negative');
   embedTotalReviews(reviewsTotal, filmReviews);

   reviewsContainer.append(reviewsItems, reviewsTotal);
   el.append(reviewsContainer);
   fragment.appendChild(el);
   return fragment;
}

function getImagesBlock(filmImages: respImages, asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__images movie-images', '', [{ attr: 'name', attrValue: 'filmImages' }]);
   asideList.append(addMenuElement('Кадры и постеры', '#filmImages'));

   const header: HTMLElement = addElement('div', 'movie-images__header');
   header.textContent = 'Кадры';
   el.append(header);
   const maxI = Math.min(MAX_FILM_IMGS, filmImages.items.length);
   for (let i = 0; i < maxI; i += 1) {
      const item: HTMLElement = addElement('div', 'movie-images__item');
      const img: HTMLElement = addElement('img',
         'movie-images__img', '',
         [{ attr: 'src', attrValue: filmImages.items[i].imageUrl },
         { attr: 'alt', attrValue: '' }]);

      item.append(img);
      el.append(item);
   }

   fragment.appendChild(el);
   return fragment;
}

function getSimilarBlock(filmSimilar: respSimilars, asideList: HTMLElement): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'movie__similar similar', '', [{ attr: 'name', attrValue: 'filmSimilar' }]);
   asideList.append(addMenuElement('Похожие', '#filmSimilar'));

   for (const item of filmSimilar.items) {
      try {
         const card: HTMLElement = addCard('similar__item', item.posterUrlPreview, item.nameRu, item.nameOriginal);
         el.append(card);
      } catch (e) {
         console.log(`Don't get staff card ${e}`);
      }
   }

   fragment.appendChild(el);
   return fragment;
}

function embedPoster(topPoster: HTMLElement, filmData: respFilm): void {
   const posterUrl: string = filmData.posterUrl;
   const attrArr: { attr: string, attrValue: string }[] = [{ attr: 'src', attrValue: posterUrl }, { attr: 'alt', attrValue: 'poster' }]
   const embedEl: HTMLElement = addElement('img', 'top__poster-fragment', '', attrArr);
   topPoster.appendChild(embedEl)

}

function embedTopInfo(
   topInfo: HTMLElement,
   filmData: respFilm,
   filmStaff: FilmStaffItem[],
   filmBoxOffice: respBoxOffice,
   filmDistributions: respDistributions,
   filmFilters: respFilters): void {

   try {
      const nameRuContent = `${filmData.nameRu} (${filmData.year.toString()})`;
      if (nameRuContent) {
         const nameRu: HTMLElement = addElement('h2', 'info__nameRu', nameRuContent);
         topInfo.append(nameRu);
      }
   } catch { }

   try {
      const nameEnContent = filmData.nameOriginal;
      if (nameEnContent) {
         const nameEn: HTMLElement = addElement('p', 'info__nameEn', nameEnContent);
         topInfo.append(nameEn);
      }
   } catch { }

   try {
      const slogan: string = filmData.slogan;
      if (slogan) {
         const sloganEl: HTMLElement = addElement('h4', 'info__slogan', slogan);
         topInfo.append(sloganEl);
      }
   } catch { }

   const about: HTMLElement = addElement('div', 'info__year', 'О фильме');
   topInfo.append(about);

   const table: HTMLElement = addElement('table', 'info__table table');

   try {
      const year: number = filmData.year;
      if (year) addTableRow(table, ['Год производства', year.toString()], 'table__row table__row_year', '');
   } catch { }

   try {
      let anchorsArray: Array<HTMLElement> = [];
      filmData.countries.forEach(el => {
         const countryName: string = el.country;
         const countryId: respCountryForFilter = filmFilters.countries.find(item => item.country === countryName) as respCountryForFilter;
         let anchor: HTMLElement = addElement('span', 'table__country-nolink', countryName);
         if (countryId) {
            const id = countryId.id;
            anchor = addElement('a', 'table__country-link', countryName, [{ attr: 'href', attrValue: `/country?${id}` }]);
         }
         anchorsArray.push(anchor);
      });
      addTableRow(table, ['Страна', anchorsArray], 'table__row table__row_country', '');
   } catch { }

   try {
      let anchorsArray: Array<HTMLElement> = [];
      filmData.genres.forEach(el => {
         const genreName: string = el.genre;
         const genreId: respGenreForFilter = filmFilters.genres.find(item => item.genre === genreName) as respGenreForFilter;
         let anchor: HTMLElement = addElement('span', 'table__country-nolink', genreName);
         if (genreId) {
            const id = genreId.id;
            anchor = addElement('a', 'table__genre-link', genreName, [{ attr: 'href', attrValue: `/genre?${id}` }]);
         }
         anchorsArray.push(anchor);
      });
      addTableRow(table, ['Жанр', anchorsArray], 'table__row table__row_genre', '');
   } catch { }

   try {
      const director: FilmStaffItem = filmStaff.find(el => el.professionKey.toUpperCase() === 'DIRECTOR') as FilmStaffItem;
      if (director) {
         const directorName: string = director.nameRu || director.nameEn;
         const anchor: HTMLElement = addElement('a', 'table__director-link', directorName, [{ attr: 'href', attrValue: `/person?${director.staffId}` }]);
         addTableRow(table, ['Режиссер', [anchor]], 'table__row table__row_director', '');
      }
   } catch { }

   try {
      let anchorsArray: Array<HTMLElement> = [];
      const screenWriter: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'WRITER') as FilmStaffItem[];
      if (screenWriter.length) {
         screenWriter.forEach(el => {
            const screenWriterName: string = el.nameRu || el.nameEn;
            const anchor: HTMLElement = addElement('a', 'table__writer-link', screenWriterName, [{ attr: 'href', attrValue: `/person?${el.staffId}` }]);
            anchorsArray.push(anchor);
         })
         addTableRow(table, ['Сценарий', anchorsArray], 'table__row table__row_writer', '');
      }
   } catch { }


   try {
      let anchorsArray: Array<HTMLElement> = [];
      const producer: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'PRODUCER') as FilmStaffItem[];
      if (producer.length) {
         producer.forEach(el => {
            const producerName: string = el.nameRu || el.nameEn;
            const anchor: HTMLElement = addElement('a', 'table__producer-link', producerName, [{ attr: 'href', attrValue: `/person?${el.staffId}` }]);
            anchorsArray.push(anchor);
         })
         addTableRow(table, ['Продюсер', anchorsArray], 'table__row table__row_producer', '');
      }
   } catch { }


   try {
      let anchorsArray: Array<HTMLElement> = [];
      const operator: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'OPERATOR') as FilmStaffItem[];
      if (operator.length) {
         operator.forEach(el => {
            const operatorName: string = el.nameRu || el.nameEn;
            const anchor: HTMLElement = addElement('a', 'table__operator-link', operatorName, [{ attr: 'href', attrValue: `/person?${el.staffId}` }]);
            anchorsArray.push(anchor);
         })
         addTableRow(table, ['Оператор', anchorsArray], 'table__row table__row_operator', '');
      }
   } catch { }


   try {
      let anchorsArray: Array<HTMLElement> = [];
      const composer: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'COMPOSER') as FilmStaffItem[];
      if (composer.length) {
         composer.forEach(el => {
            const composerName: string = el.nameRu || el.nameEn;
            const anchor: HTMLElement = addElement('a', 'table__composer-link', composerName, [{ attr: 'href', attrValue: `/person?${el.staffId}` }]);
            anchorsArray.push(anchor);
         })
         addTableRow(table, ['Композитор', anchorsArray], 'table__row table__row_composer', '');
      }
   } catch { }


   try {
      let anchorsArray: Array<HTMLElement> = [];
      const designer: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'DESIGN') as FilmStaffItem[];
      if (designer.length) {
         designer.forEach(el => {
            const designerName: string = el.nameRu || el.nameEn;
            const anchor: HTMLElement = addElement('a', 'table__designer-link', designerName, [{ attr: 'href', attrValue: `/person?${el.staffId}` }]);
            anchorsArray.push(anchor);
         })
         addTableRow(table, ['Художник', anchorsArray], 'table__row table__row_designer', '');
      }
   } catch { }


   try {
      let anchorsArray: Array<HTMLElement> = [];
      const editor: FilmStaffItem[] = filmStaff.filter(el => el.professionKey.toUpperCase() === 'EDITOR') as FilmStaffItem[];
      if (editor.length) {
         editor.forEach(el => {
            const editorName: string = el.nameRu || el.nameEn;
            const anchor: HTMLElement = addElement('a', 'table__editor-link', editorName, [{ attr: 'href', attrValue: `/person?${el.staffId}` }]);
            anchorsArray.push(anchor);
         })
         addTableRow(table, ['Монтаж', anchorsArray], 'table__row table__row_editor', '');
      }
   } catch { }

   try {
      if (filmBoxOffice.total > 0) {
         const worldAmountObj: respBoxOfficeItem = filmBoxOffice.items.find(el => el.type.toUpperCase() === 'WORLD') as respBoxOfficeItem;
         const worldBudgetObj: respBoxOfficeItem = filmBoxOffice.items.find(el => el.type.toUpperCase() === 'BUDGET') as respBoxOfficeItem;
         if (worldAmountObj) {
            const worldAmount: string = worldAmountObj.amount.toLocaleString('en-IN', { style: 'currency', currency: 'USD' });
            addTableRow(table, ['Сборы в мире', worldAmount], 'table__row table__row_world-amount', '');
         }
         if (worldBudgetObj) {
            const budget: string = worldBudgetObj.amount.toLocaleString('en-IN', { style: 'currency', currency: 'USD' });
            addTableRow(table, ['Бюджет', budget], 'table__row table__row_budget', '');
         }
      }
   } catch { }

   try {
      if (filmDistributions.total > 0) {
         const worldPremierObj: respDistributionsItem = filmDistributions.items.find(el => el.type.toUpperCase() === 'WORLD_PREMIER') as respDistributionsItem;
         if (worldPremierObj) {
            const worldPremier: string = new Date(worldPremierObj.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
            addTableRow(table, ['Премьера в мире', worldPremier], 'table__row table__row_budget', '');
         }
      }
   } catch { }

   try {
      const filmLength: string = filmData.filmLength.toString();
      if (filmLength) addTableRow(table, ['Время', `${filmLength} мин.`], 'table__row table__row_length', '');
   } catch { }

   topInfo.append(table);

}

function embedReviews(reviewsItems: HTMLElement, reviews: respReviewItem[], max: number, className: string): void {

   for (let i = 0; i < max; i += 1) {
      const reviewItem: HTMLElement = addElement('div', `reviews__item reviews__item_${className} item`);

      const reviewItemHeader: HTMLElement = addElement('div', 'item__header');
      const reviewAuthor: HTMLElement = addElement('div', 'item__author', reviews[i].author);
      const rDate = new Date(reviews[i].date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
      const reviewDate: HTMLElement = addElement('div', 'item__date', rDate);
      reviewItemHeader.append(reviewAuthor, reviewDate);

      const reviewItemBody: HTMLElement = addElement('div', 'item__body');
      const reviewTitle: HTMLElement = addElement('h5', 'item__author', reviews[i].title);
      const reviewDescription: HTMLElement = addElement('div', 'item__description', reviews[i].description);
      reviewItemBody.append(reviewTitle, reviewDescription);

      const reviewItemFooter: HTMLElement = addElement('div', 'item__footer');
      const reviewPositiveRating: HTMLElement = addElement('div', 'item__pos-rating', String(reviews[i].positiveRating));
      const reviewNegativeRating: HTMLElement = addElement('div', 'item__neg-rating', String(reviews[i].negativeRating));
      const buttonShowAll: HTMLElement = addElement('button', 'btn btn__show-all-review', 'Показать всю рецензию', [{ attr: 'type', attrValue: 'button' }]);
      reviewItemFooter.append(buttonShowAll, reviewPositiveRating, reviewNegativeRating);

      reviewItem.append(reviewItemHeader, reviewItemBody, reviewItemFooter);
      reviewsItems.append(reviewItem);
   }

}

function embedTotalReviews(reviewsTotal: HTMLElement, filmReviews: respReviews): void {
   const totalContainer: HTMLElement = addElement('div', `total__item total-item`);
   const totalNumber: HTMLElement = addElement('div', 'total-item__number total-item__number_all', String(filmReviews.total));
   const totalHeader: HTMLElement = addElement('div', 'total-item__header total-item__header_all', 'Всего');
   totalContainer.append(totalNumber, totalHeader);

   const positiveContainer: HTMLElement = addElement('div', `total__item total-item`);
   const positiveNumber: HTMLElement = addElement('div', 'total-item__number total-item__number_pos', String(filmReviews.totalPositiveReviews));
   const positiveHeader: HTMLElement = addElement('div', 'total-item__header total-item__header_pos', 'Положительные');
   positiveContainer.append(positiveNumber, positiveHeader);

   const negContainer: HTMLElement = addElement('div', `total__item total-item`);
   const negNumber: HTMLElement = addElement('div', 'total-item__number total-item__number_neg', String(filmReviews.totalNegativeReviews));
   const negHeader: HTMLElement = addElement('div', 'total-item__header total-item__header_neg', 'Положительные');
   negContainer.append(negNumber, negHeader);

   const neutralContainer: HTMLElement = addElement('div', `total__item total-item`);
   const neutralNumber: HTMLElement = addElement('div', 'total-item__number total-item__number_neutral', String(filmReviews.totalNeutralReviews));
   const neutralHeader: HTMLElement = addElement('div', 'total-item__header total-item__header_neutral', 'Нейтральные');
   neutralContainer.append(neutralNumber, neutralHeader);

   reviewsTotal.append(totalContainer, positiveContainer, negContainer, neutralContainer);
}

export default moviePage;

