import { addBurgerListener } from '../handlers/headerHandler';
import { addSearchListener } from '../handlers/searchHandlers';

function showHeader(): HTMLElement {
   const headerElement: HTMLElement = document.createElement('header');
   headerElement.className = 'header';
   headerElement.innerHTML = `
   <div class="container">
      <div class="header__container">
         <div class="header__logo">
              <a href="/">
                 <img class="logo__img" src="../logo.svg" alt="logo">
                 <img class="logo__img_short" src="../logo_short.png" alt="logo">
              </a>
         </div>
         <nav class="header__nav">
            <a class="nav__item" href="/">Главная</a>
            <a class="nav__item" href="/films?category=lists">Фильмы</a>
            <a class="nav__item" href="/series?category=lists">Сериалы</a>
         </nav>
         <div class="header__right">
           <input type="search" class="header__search" placeholder="Поиск">
           ${userInOut()}
         </div>
         <nav class="header__nav header__nav_burger">
         <input type="search" class="header__search" placeholder="Поиск">
            <a class="nav__item" href="/">Главная</a>
            <a class="nav__item" href="/films">Фильмы</a>
            <a class="nav__item" href="/series">Сериалы</a>
            ${userInOut()}
         </nav>
         <div class="header__burger">
            <span></span>
         </div>
      </div>
   </div>
   `;
   setTimeout(addSearchListener, 100);
   setTimeout(addBurgerListener, 100);
   return headerElement;
}

function userInOut() {
   if (sessionStorage.getItem('user')) {
      const { displayName } = JSON.parse(sessionStorage.getItem('user') as string);
      return `<a class="authentication__link" href="/auth">Привет, ${displayName}!</a>`;
   } else return '<a class="authentication__link" href="/authentication">Войти</a>';
}

export default showHeader;
