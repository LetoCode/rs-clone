function showHeader(): HTMLElement {
   const footerElement: HTMLElement = document.createElement('header');
   footerElement.className = 'header';
   footerElement.textContent = 'I am HEADER';

   return footerElement;
}

export default showHeader;