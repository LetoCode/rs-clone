function showFooter(): HTMLElement {
   const footerElement: HTMLElement = document.createElement('footer');
   footerElement.className = 'footer';
   footerElement.textContent = 'I am FOOTER';

   return footerElement;
}

export default showFooter;