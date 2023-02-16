import * as Controller from "../kinopoiskAPI/controller";
import * as imdbController from "../imdbAPI/imdbController";
import * as App from "../app/app";
import { addElement, addTableRow } from "../utils/elementsBuilder";
import { router } from "../router/router";
import { buttonProfClick } from "./handlers/personHandlers";
import noPoster from '../../assets/noPoster.gif';

const FILMS_ON_PAGE: number = 10;
const PROFS: {
   actor: string;
   director: string;
   writer: string;
   producer: string;
   editor: string;
   operator: string;
   design: string;
} = {
   actor: 'Актер',
   director: 'Режиссер',
   writer: 'Сценарист',
   producer: 'Продюссер',
   editor: 'Монтаж',
   operator: 'Оператор',
   design: 'Художник'
}

function personPage(): void {
   App.showPage(createPersonPage);
}

function createPersonPage(): HTMLElement {
   const id: string = window.location.search.replace('?', '');
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';

   (async () => {
      const personContainer: HTMLElement = addElement('div', 'container person');
      const personData: PersonByID = await Controller.getPersonById(id) as PersonByID;
      if (!personData) router('/404');
      console.log('personData=', personData)

      const topBlock: DocumentFragment = getTopBlock(personData);
      personContainer.append(topBlock);

      if (personData.facts.length) {
         const factsBlock: DocumentFragment = getFactsBlock(personData.facts);
         personContainer.append(factsBlock);
      }

      if (personData.films.length) {
         const filmsBlock: DocumentFragment = await getFilmsBlock(personData.films);
         personContainer.append(filmsBlock);
      }

      mainElement.append(personContainer);
   })();
   return mainElement;
}


function getTopBlock(personData: PersonByID): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'person__top top', '', [{ attr: 'name', attrValue: 'personName' }]);

   const topBlock: HTMLElement = addElement('div', 'top-person__block');
   const topPoster: HTMLElement = addElement('div', 'top-person__poster');
   const topInfo: HTMLElement = addElement('div', 'top-person__info info');
   embedPoster(topPoster, personData);
   embedTopInfo(topInfo, personData);


   topBlock.append(topPoster, topInfo);

   el.appendChild(topBlock);
   fragment.appendChild(el);
   return fragment;
}


function getFactsBlock(facts: string[]): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'person__facts facts', '', [{ attr: 'name', attrValue: 'personName' }]);

   const title: HTMLElement = addElement('div', 'facts__title', 'Знаете ли вы, что...');
   el.append(title);
   const items: HTMLElement = addElement('ul', 'facts__items');
   for (const fact of facts) {
      const item: HTMLElement = addElement('li', 'fact__item', fact);
      items.append(item);
   }
   el.appendChild(items);
   fragment.appendChild(el);
   return fragment;
}


async function getFilmsBlock(films: personsFilm[]): Promise<DocumentFragment> {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'person__films person-films', '', [{ attr: 'name', attrValue: 'personFilms' }]);

   const container: HTMLElement = addElement('div', 'persons-film__container');
   const personMenu: HTMLElement = addElement('div', 'persons-film__menu block-menu');
   const personFilms: HTMLElement = addElement('div', 'person-film__films');
   container.append(personMenu, personFilms);

   const [uniqProfessions, theMostProfessionCount]: [Set<string>, string] = getProfessions(films);

   for (const prof of uniqProfessions) {
      if (prof === 'HIMSELF' || prof === 'HRONO_TITR_MALE') continue;
      const profKey = (prof.toLocaleLowerCase()) as keyof typeof PROFS;
      const currentProf: string = PROFS[profKey] || prof;
      const buttonProf: HTMLElement = addElement('button', 'btn person-film__btn', currentProf,
         [{ attr: 'type', attrValue: 'button' }]);
      if (prof === theMostProfessionCount) buttonProf.classList.add('_active');
      const filmsForButton: personsFilm[] = films.filter(el => el.professionKey === prof);
      buttonProf.addEventListener('click', (event: Event): Promise<void> =>
         buttonProfClick.call(buttonProf, event, filmsForButton, personFilms));
      personMenu.append(buttonProf);
   }

   const currentFilms: personsFilm[] = films.filter(el => {
      return el.professionKey === theMostProfessionCount && el.nameEn && el.nameRu;
   });
   showFilmPageWithPagination(currentFilms, personFilms, 1);

   el.appendChild(container);
   fragment.appendChild(el);
   return fragment;
}


function embedPoster(topPoster: HTMLElement, personData: PersonByID): void {
   const posterUrl: string = personData.posterUrl;
   const attrArr: { attr: string, attrValue: string }[] = [{ attr: 'src', attrValue: posterUrl }, { attr: 'alt', attrValue: 'poster' }]
   const embedEl: HTMLElement = addElement('img', 'top__poster-img', '', attrArr);
   topPoster.appendChild(embedEl)
}


function embedTopInfo(topInfo: HTMLElement, personData: PersonByID): void {

   showPersonNameRu(personData, topInfo);
   showPersonNameEn(personData, topInfo);

   const about: HTMLElement = addElement('div', 'info__year', 'О персоне');
   topInfo.append(about);
   const table: HTMLElement = addElement('table', 'info__table info__table_person table');

   showProfession(personData, table);
   showGrowth(personData, table);
   showBirthday(personData, table);
   showDeath(personData, table);
   showBirthplace(personData, table);
   showDeathplace(personData, table);
   showSpouses(personData, table);

   topInfo.append(table);
}


function showPersonNameRu(personData: PersonByID, topInfo: HTMLElement) {
   try {
      const nameRuContent = `${personData.nameRu}`;
      if (nameRuContent) {
         const nameRu: HTMLElement = addElement('h2', 'info__nameRu', nameRuContent);
         topInfo.append(nameRu);
      }
   } catch (e: unknown) { console.log(e) }
}

function showPersonNameEn(personData: PersonByID, topInfo: HTMLElement) {
   try {
      const nameEnContent = personData.nameEn || '';
      if (nameEnContent) {
         const nameEn: HTMLElement = addElement('p', 'info__nameEn', nameEnContent);
         topInfo.append(nameEn);
      }
   } catch (e: unknown) { console.log(e) }
}


function showProfession(personData: PersonByID, table: HTMLElement) {
   try {
      const profession: string = personData.profession;
      if (profession) addTableRow(table, ['Карьера', profession], 'table__row table__row_profession', '');

   } catch (e: unknown) { console.log(e) }
}


function showGrowth(personData: PersonByID, table: HTMLElement) {
   try {
      const growth: string = personData.growth;
      if (growth) addTableRow(table, ['Рост', growth.toString()], 'table__row table__row_growth', '');

   } catch (e: unknown) { console.log(e) }
}

function showBirthday(personData: PersonByID, table: HTMLElement) {
   try {
      const birthday: string = personData.growth;
      if (birthday) addTableRow(table, ['День рождения', new Date(birthday).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })], 'table__row table__row_birthday', '');

   } catch (e: unknown) { console.log(e) }
}

function showDeath(personData: PersonByID, table: HTMLElement) {
   try {
      const death: string = personData.death;
      if (death) addTableRow(table, ['День смерти', new Date(death)
         .toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })], 'table__row table__row_death', '');

   } catch (e: unknown) { console.log(e) }
}


function showBirthplace(personData: PersonByID, table: HTMLElement) {
   try {
      const birthplace: string = personData.birthplace;
      if (birthplace) addTableRow(table, ['Место рождения', birthplace], 'table__row table__row_birthplace', '');

   } catch (e: unknown) { console.log(e) }
}

function showDeathplace(personData: PersonByID, table: HTMLElement) {
   try {
      const deathplace: string = personData.deathplace;
      if (deathplace) addTableRow(table, ['Место смерти', deathplace], 'table__row table__row_deathplace', '');

   } catch (e: unknown) { console.log(e) }
}


function showSpouses(personData: PersonByID, table: HTMLElement) {
   if (personData.spouses.length) {
      try {
         let anchorsArray: Array<HTMLElement> = [];
         const spouse: Spouses[] = personData.spouses.filter(el => el.name) as Spouses[];
         if (spouse.length) {
            spouse.forEach(el => {
               const anchor: HTMLElement = addElement('a', 'table__spouse-link table__link', el.name, [{ attr: 'href', attrValue: `/person?${el.personId}` }]);
               anchorsArray.push(anchor);
            })
            addTableRow(table, ['Супруги', anchorsArray], 'table__row table__row_spouses', '');
         }
      } catch (e: unknown) { console.log(e) }
   }
}

function getProfessions(films: personsFilm[]): [Set<string>, string] {
   const professions: string[] = films.map(el => el.professionKey);
   const professionsCount: { [key: string]: number } = {}
   const uniqProfessions: Set<string> = new Set(professions);
   uniqProfessions.forEach(el => {
      const value: number = professions.reduce((acc, item) => {
         switch (el) {
            case 'HIMSELF':
               return acc;
               break;
            case 'HRONO_TITR_MALE':
               return acc;
               break;
            default:
               return item === el ? acc + 1 : acc;
         }
      }, 0)
      professionsCount[el] = value;
   })

   const professionsCountValues: number[] = Object.values(professionsCount).sort((a, b) => b - a);
   const maxValue: number = professionsCountValues[0];
   let theMostProfession: string = '';
   for (const [key, value] of Object.entries(professionsCount)) {
      if (value === maxValue) theMostProfession = key;
   }
   return [uniqProfessions, theMostProfession];
}

export async function showFilmPageWithPagination(currentFilms: personsFilm[], personFilms: HTMLElement, page: number): Promise<void> {
   //const pagesCount: number = Math.ceil(currentFilms.length / FILMS_ON_PAGE);
   const start: number = FILMS_ON_PAGE * (page - 1);
   const finish: number = FILMS_ON_PAGE * (page);
   const filmsOnPage = currentFilms.slice(start, finish)
   console.log('currentFilms =', currentFilms)
   console.log('filmsOnPage =', filmsOnPage)

   for (const item of filmsOnPage) {
      if (item.nameEn && item.nameRu) {
         const imdbData: respImdbTitle = await imdbController.getFilmImdb(item.nameEn) as respImdbTitle;
         const filmContainer: HTMLElement = addElement('div', 'persons-film__item');
         const imageContainer: HTMLElement = addElement('div', 'persons-film__image');
         const a1: HTMLElement = addElement('a', 'persons-film__link', '',
            [{ attr: 'href', attrValue: `/movie?${item.filmId}` }]);
         const image: HTMLElement = addElement('img', '', '',
            [{ attr: 'src', attrValue: imdbData.Poster || noPoster },
            { attr: 'alt', attrValue: '' },
            { attr: 'loading', attrValue: 'lazy' }]);
         a1.append(image);
         imageContainer.append(a1);
         const filmName: HTMLElement = addElement('div', 'persons-film__name');
         const filmRatingContainer: HTMLElement = addElement('div', 'persons-film__rating-container');
         const filmRatingName: HTMLElement = addElement('div', 'persons-film__rating-name', 'рейтинг Кинопоиск');
         const filmRatingValue: HTMLElement = addElement('div', 'persons-film__rating-value', item.rating || '-');
         const a2: HTMLElement = addElement('a', 'persons-film__link', item.nameRu,
            [{ attr: 'href', attrValue: `/movie?${item.filmId}` }]);
         filmRatingContainer.append(filmRatingName, filmRatingValue);
         filmName.append(a2);
         filmContainer.append(imageContainer, filmName, filmRatingContainer);
         personFilms.append(filmContainer);
      }
   }
}


export default personPage;