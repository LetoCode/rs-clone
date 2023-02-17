import * as App from "../app/app";
import * as Controller from "../kinopoiskAPI/controller";
import { router } from "../router/router";
import { addElement } from "../utils/elementsBuilder";
import noPhoto from '../../assets/noPhoto.png';


function staffPage(): void {
   App.showPage(createStaffPage);
}
export default staffPage;

function createStaffPage(): HTMLElement {
   const id: string = window.location.search.replace('?', '');
   const mainElement: HTMLElement = document.createElement('div');
   mainElement.className = 'main';
   const staffContainer: HTMLElement = addElement('div', 'container staff');

   const title: HTMLElement = addElement('div', 'staff__title', 'Актеры и создатели ...');

   staffContainer.append(title);

   (async () => {
      const staffItemsContainer: HTMLElement = addElement('div', 'staff__items');
      const filmStaff: FilmStaffItem[] = await Controller.getStaff(id) as FilmStaffItem[];
      if (!filmStaff) router('/404');
      console.log(filmStaff)

      for (const item of filmStaff) {
         if (item.nameEn && item.nameRu) {
            const itemContainer: HTMLElement = addElement('div', 'staff__item');
            const imageContainer: HTMLElement = addElement('div', 'staff__image');
            const a1: HTMLElement = addElement('a', 'staff__link', '',
               [{ attr: 'href', attrValue: `/person?${item.staffId}` }]);
            const image: HTMLElement = addElement('img', '', '',
               [{ attr: 'src', attrValue: item.posterUrl }, { attr: 'alt', attrValue: noPhoto }]);
            a1.append(image);
            imageContainer.append(a1);
            const itemNameContainer: HTMLElement = addElement('div', 'staff__name');
            const a2: HTMLElement = addElement('a', 'persons-film__link', item.nameRu,
               [{ attr: 'href', attrValue: `/person?${item.staffId}` }]);
            const itemNameEn: HTMLElement = addElement('div', 'staff__name_en', item.nameEn);
            itemNameContainer.append(a2, itemNameEn);
            const itemProfession: HTMLElement = addElement('div', 'staff__prof', item.professionText.slice(0, -1));
            itemContainer.append(imageContainer, itemNameContainer, itemProfession);
            staffItemsContainer.append(itemContainer);
         }
      }
      staffContainer.append(staffItemsContainer);
      mainElement.append(staffContainer);
   })();
   return mainElement;
}
