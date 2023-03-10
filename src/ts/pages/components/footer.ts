function showFooter(): HTMLElement {
   const footerElement: HTMLElement = document.createElement('footer');
   footerElement.className = 'footer';
   footerElement.innerHTML = `
      <div class="container">
         <div class="footer__cols">
            <div class="footer__left">
               <div class="github">
                  <a href="https://github.com/LetoCode">
                     <img src="../github.svg" class="github__img" alt="github">
                     <div class="github-name">LetoCode</div>
                  </a>
               </div>
               <div class="github">
                  <a href="https://github.com/EGalitsky">
                     <img src="../github.svg" class="github__img" alt="github">
                     <div class="github-name">EGalitsky</div>
                  </a>
               </div>
               <div class="github">
                  <a href="https://github.com/eOne1999">
                     <img src="../github.svg" class="github__img" alt="github">
                     <div class="github-name">eOne1999</div>

                  </a>
               </div>
            </div>
            <div class="footer__right">
               2023
               <a href="https://rs.school/js/">
                  <img src="../rss.svg" class="footer__rss" alt="RS School">
               </a>
            </div>
         </div>
      </div>
   `;

   return footerElement;
}

export default showFooter;