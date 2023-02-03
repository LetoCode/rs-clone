import * as App from "../app/app";

function notFoundPage(): void {
   App.showPage(createFoundPage)
}

function createFoundPage(): HTMLElement {
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';
   mainElement.textContent = 'I am 404 page';

   return mainElement;
}

export default notFoundPage;

