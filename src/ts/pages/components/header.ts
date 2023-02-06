function showHeader(): HTMLElement {
   const footerElement: HTMLElement = document.createElement('header');
   footerElement.className = 'header';
   // footerElement.textContent = 'I am HEADER';
   footerElement.innerHTML = `
   <div class="container">
      <div class="header__container">
         <div class="header__logo">
              <a href="/">
                 <img class="logo__img" src="logo.svg" alt="logo">
              </a>
         </div>
         <nav class="header__nav">
            <a class="nav__item" href="/">Главная</a>
            <a class="nav__item" href="#">Фильмы</a>
            <a class="nav__item" href="#">Сериалы</a>
         </nav>
         <div class="header__right">
           <input type="search" class="header__search" placeholder="Поиск">
           <a href="#">Войти</a>
         </div>
      </div>
   </div>
   `;

   return footerElement;
}

export default showHeader;
