import * as App from "../app/app";

function moviePage(): void {
   App.showPage(createMoviePage)
}

function createMoviePage(): HTMLElement {
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';
   mainElement.textContent = 'I am the MOVIE page';

   return mainElement;
}

export default moviePage;