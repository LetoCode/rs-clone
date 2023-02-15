import * as Controller from "../kinopoiskAPI/controller";
import * as App from "../app/app";
import { addElement, addTableRow } from "../utils/elementsBuilder";
import { router } from "../router/router";
import { buttonProfClick } from "./handlers/personHandlers";

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
      console.log(personData)

      const topBlock: DocumentFragment = getTopBlock(personData);
      personContainer.append(topBlock);

      if (personData.facts.length) {
         const factsBlock: DocumentFragment = getFactsBlock(personData.facts);
         personContainer.append(factsBlock);
      }

      if (personData.films.length) {
         const filmsBlock: DocumentFragment = getFilmsBlock(personData.films);
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
   const items: HTMLElement = addElement('div', 'facts__items');
   for (const fact of facts) {
      const item: HTMLElement = addElement('div', 'fact__item', fact);
      items.append(item);
   }
   el.appendChild(items);
   fragment.appendChild(el);
   return fragment;
}


function getFilmsBlock(films: personsFilm[]): DocumentFragment {
   const fragment: DocumentFragment = new DocumentFragment();
   const el: HTMLElement = addElement('div', 'person__films person-films', '', [{ attr: 'name', attrValue: 'personFilms' }]);

   const container: HTMLElement = addElement('div', 'persons-film__container');
   const personMenu: HTMLElement = addElement('div', 'persons-film__menu block-menu');
   const personFilms: HTMLElement = addElement('div', 'person-film__Films');
   container.append(personMenu, personFilms);

   const [uniqProfessions, theMostProfessionCount]: [Set<string>, string] = getProfessions(films);

   for (const prof of uniqProfessions) {
      const buttonProf: HTMLElement = addElement('button', 'btn person-film__btn', prof,
         [{ attr: 'type', attrValue: 'button' }]);
      if (prof === theMostProfessionCount) buttonProf.classList.add('_active');
      buttonProf.addEventListener('click', (event: Event): void =>
         buttonProfClick.call(buttonProf, event, films, personFilms));
      personMenu.append(buttonProf);
   }

   const currentFilms: personsFilm[] = films.filter(el => el.professionKey === theMostProfessionCount);
   for (const item of currentFilms) {
      if (item.nameRu) {
         const filmContainer: HTMLElement = addElement('div', 'persons-film__item');
         const filmName: HTMLElement = addElement('div', 'persons-film__name');
         const filmRating: HTMLElement = addElement('div', 'persons-film__rating');
         const a: HTMLElement = addElement('a', 'persons-film__link', item.nameRu,
            [{ attr: 'href', attrValue: `/movie?${item.filmId}` }]);
         filmRating.textContent = item.rating;
         filmName.append(a);
         filmContainer.append(filmName, filmRating);
         personFilms.append(filmContainer);
      }
   }

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
   const table: HTMLElement = addElement('table', 'info__table table');

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

function getProfessions(films: personsFilm[]): [uniqProfessions: Set<string>, theMostProfession: string] {
   const professions: string[] = films.map(el => el.professionKey);
   const professionsCount: { [key: string]: number } = {}
   const uniqProfessions: Set<string> = new Set(professions);
   uniqProfessions.forEach(el => {
      const value: number = professions.reduce((acc, item) => {
         return item === el ? acc + 1 : acc;
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







export default personPage;