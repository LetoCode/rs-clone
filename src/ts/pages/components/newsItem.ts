import { addElement } from "../../utils/elementsBuilder";
import logo from '../../../public/logo.svg';

export function createNewsItem(block: HTMLElement, data: newsArticle) {
   const newsItemContainer: HTMLElement = addElement('div', 'section__news-item news-item');
   const newsItemOverlay: HTMLElement = addElement('div', 'news-item-overlay');
   const newsAnchor: HTMLElement = addElement('a', 'news-item__link', '', [{ attr: 'href', attrValue: data.url }]);
   const newsBody: HTMLElement = addElement('div', 'news-item__body');
   const newsTitle: HTMLElement = addElement('p', 'news-item__title ', data.title);
   newsBody.append(newsTitle);
   if (data.source.name) {
      const newsSource: HTMLElement = addElement('p', 'poster__desc news-item__source', data.source.name);
      newsBody.append(newsSource);
   }
   const newsImage: HTMLElement = addElement('div', 'news-item__image');
   try {
      const newsPhoto: HTMLElement = addElement('img', 'news-item__image-photo', '',
         [{ attr: 'src', attrValue: data.urlToImage }, { attr: 'alt', attrValue: logo }]);
      newsImage.append(newsPhoto);

   } catch (err: unknown) {
      console.log('err catch', err);
      console.log('fetch catch', data.urlToImage);
   }

   newsItemContainer.append(newsItemOverlay, newsAnchor, newsImage, newsBody);
   block.append(newsItemContainer);
}