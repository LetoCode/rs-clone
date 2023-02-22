import * as App from "../app/app";
import { addElement } from "../utils/elementsBuilder";

function notFoundPage(): void {
   App.showPage(createFoundPage)
}

function createFoundPage(): HTMLElement {
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';
   const notFound: HTMLElement = addElement('div', 'main__not-found not-found');
   const notFoundEmoji: HTMLElement = addElement('div', 'not-found__emoji', '(>_<)');
   const notFoundHeader: HTMLElement = addElement('h2', 'not-found__header', 'Страница не найдена');
   notFound.append(notFoundEmoji, notFoundHeader);
   mainElement.append(notFound);

   return mainElement;
}

export default notFoundPage;

