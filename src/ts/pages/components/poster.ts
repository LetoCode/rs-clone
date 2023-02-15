import { router } from "../../router/router";

export function createPoster(block: HTMLElement, data: respFilmItem): void {
   const film = data;
   const poster = document.createElement('div');
   const posterAnchor = document.createElement('a');
   const posterImg = document.createElement('img');
   const posterTitle = document.createElement('p');
   const posterDesc = document.createElement('p');
   const id = film.kinopoiskId | film.filmId;
   const pathname = `/movie?${id}`

   block.append(poster);
   poster.className = 'section__poster';

   posterImg.className = 'poster__img';
   if (film.posterUrlPreview) posterImg.src = film.posterUrlPreview;
   else posterImg.src = film.posterUrl;
   posterAnchor.append(posterImg);

   posterAnchor.className = 'poster__link';
   posterAnchor.setAttribute('href', pathname);
   posterAnchor.addEventListener('click', (event) => {
      event.preventDefault();
      router(pathname);
   });
   poster.append(posterAnchor);

   poster.append(posterTitle);
   posterTitle.className = 'poster__title';
   if (film.nameRu) posterTitle.textContent = film.nameRu;
   else posterTitle.textContent = film.nameEn;

   poster.append(posterDesc);
   posterDesc.className = 'poster__desc';
   posterDesc.textContent = `${film.year}, ${film.genres[0].genre}`;
}