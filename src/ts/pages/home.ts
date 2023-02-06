import * as App from "../app/app";
import { getPremieres } from "../kinopoiskAPI/controller";

function homePage(): void {
   App.showPage(createHomePage)
}

function createHomePage(): HTMLElement {
   const mainElement: HTMLElement = document.createElement('main');
   const premieres = document.createElement('div');
   const premieresTitle = document.createElement('h2');
   const premieresSelection = document.createElement('div');

   mainElement.className = 'main';
   mainElement.append(premieres);
   premieres.className = 'premieres';
   premieres.append(premieresTitle);
   premieresTitle.textContent = 'Премьеры';
   premieres.append(premieresSelection);
   premieresSelection.className = 'selection premieres';

   getPremieres('2023', 'January').then(data => {
      createSelection(premieresSelection, data);
   });

   return mainElement;
}

export default homePage;

function createSelection(selection: HTMLElement, data: string | respPremieres) {
   const postersData = JSON.parse(JSON.stringify(data));
   for (let i = 0; i < 6; i++) {
      const currData = postersData.items[i];
      const poster = document.createElement('div');
      const posterImg = document.createElement('img');
      const posterTitle = document.createElement('p');
      const posterDesc = document.createElement('p');

      selection.append(poster);
      poster.className = 'selection__poster';

      poster.append(posterImg);
      posterImg.className = 'poster__img';
      posterImg.src = currData.posterUrl;

      poster.append(posterTitle);
      posterTitle.className = 'poster__title';
      posterTitle.textContent = currData.nameRu;

      poster.append(posterDesc);
      posterDesc.className = 'poster__desc';
      posterDesc.textContent = `${currData.year}, ${currData.genres[0].genre}`;
   }
}


// async function getMainPoster() {
//    let data: respPremieres | string;
//    data = await getPremieres('2023', 'January');
//    let arrPrem = JSON.parse(JSON.stringify(data));
//    const rand = Math.floor(Math.random() * arrPrem.items.length);
//    const mainPoster = arrPrem.items[rand];
//    console.log(mainPoster);

//    const video = await getVideos(mainPoster.kinopoiskId);
//    console.log(JSON.parse(JSON.stringify(video)));
//    // return mainPoster;
// }

// function createMainBanner() {
//    const mainBanner = document.createElement('div');
//    const bannerVideo = document.createElement('')

// }
