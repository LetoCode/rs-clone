import * as App from "../app/app";

function homePage(): void {
   App.showPage(createHomePage)
}

function createHomePage(): HTMLElement {
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';
   mainElement.textContent = 'I am the MAIN page';

   return mainElement;
}

export default homePage;
