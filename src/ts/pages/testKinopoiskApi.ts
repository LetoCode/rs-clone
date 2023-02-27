import * as App from "../app/app";
import KINOPOISK_APIS from "../kinopoiskAPI/allKinopoiskAPI_test";

function testApi(): void {
   App.showPage(createTestPage)
}

function createTestPage(): HTMLElement {
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';
   const testContainer: HTMLElement = document.createElement('div');
   testContainer.className = 'test-container';
   mainElement.append(testContainer);

   const buttonsContainer: HTMLElement = document.createElement('div');
   buttonsContainer.className = 'test-container__buttons test-buttons';
   const textContainer: HTMLElement = document.createElement('div');
   textContainer.className = 'test-container__text';
   testContainer.append(buttonsContainer, textContainer);

   for (const el of KINOPOISK_APIS) {
      const button: HTMLElement = document.createElement('button');
      button.className = 'test-buttons__button';
      button.textContent = el.name;
      button.onclick = clickOnTestButton.bind(button, el.cb);
      buttonsContainer.append(button);
   }

   return mainElement;
}

async function clickOnTestButton(cb: allKinopoiskAPIs['cb']) {
   const containerText: HTMLElement = document.querySelector('.test-container__text') as HTMLElement;
   let viewData = 'ERROR may be?';
   let data: Promise<Response>;
   if (containerText) {
      if (cb.name === 'getTOP250' || cb.name === 'getTOP100' || cb.name === 'getTOPAwait') {
         data = await cb(1);
      } else if (cb.name === 'getPremieres') {
         data = await cb('2023', 'january');
      } else if (cb.name === 'getFilters') {
         data = await cb();
      } else if (cb.name === 'getFilmsWithFilters') {
         const filters: argumentForFilmSearch = {
            page: 2,
            country: 14,
            genres: 2,
            filmsOrder: 'YEAR',
            filmsType: 'ALL'
         }
         data = await cb(filters);
      } else if (cb.name === 'getSequelsAndPrequels') {
         data = await cb(301);
      } else if (cb.name === 'getFilmsByKeyWord') {
         data = await cb('matrix', 1);
      } else if (cb.name === 'getPersonById') {
         data = await cb('66539');
      } else if (cb.name === 'getPersonsByName') {
         data = await cb('Bellucci');
      } else {
         data = await cb(329);
      }
      if (data) viewData = JSON.stringify(data);

      containerText.textContent = viewData;
   }
}


export default testApi;
