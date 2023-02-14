import homePage from "../home";
import { showSearchResults } from "../searchPage";

export function addSearchListener(): void {
   const inputSearch: HTMLInputElement | null = document.querySelector('.header__search');
   if (inputSearch) {
      restoreSearchResults(inputSearch);
      inputSearch.addEventListener('input', () => {
         const value = setQueryParamsForSearch(inputSearch);
         showSearchResults(value);
      });
   }
}

function setQueryParamsForSearch(target: HTMLInputElement): string {
   const origin = window.location.origin;
   const search = window.location.search;
   const key = 'search';
   const value = target.value;
   let params: URLSearchParams;
   let url: string;

   if (search) {
      params = new URLSearchParams(search);
   } else {
      params = new URLSearchParams();
   }

   if (key && value) {
      params.set(key, value);
   } else {
      params.delete(key);
      setTimeout(homePage, 100);
   }

   if (params.toString().length === 0) {
      url = origin;
   } else {
      url = `${origin}?${params}`;
   }

   window.history.pushState({}, '', url);
   return value;
}

function restoreSearchResults(target: HTMLInputElement): void {
   const search = window.location.search;
   const key = 'search';
   let value: string | null;

   if (search) {
      const params = new URLSearchParams(search);
      value = params.get(key);

      if (value) {
         target.value = value;
         showSearchResults(value);
      }
   }
}