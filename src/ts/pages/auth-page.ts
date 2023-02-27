import { DocumentReference, DocumentData } from 'firebase/firestore';
import { getUserData, getUserDocRef, addFilm, deleteFilm, signOutUser } from '../utils/firebase-utils';
import { addElement } from '../utils/elementsBuilder';
import { getFilm } from '../kinopoiskAPI/controller';
import { router } from '../router/router';
import { getIDfromPathname } from '../utils/endpoints';
import * as App from '../app/app';

export default function authPage(): void {
   App.showPage(createAuthPage);
}

function createAuthPage(): HTMLElement {
   const { uid }: userData = JSON.parse(sessionStorage.getItem('user') as string);
   const authMainPage: HTMLElement = addElement('main', 'main');
   const authContainer: HTMLElement = addElement('div', 'auth-container container');
   const authTop: HTMLElement = createAuthTop(uid);
   const authMovies: HTMLElement = createAuthMovies(uid);
   authContainer.append(authTop, authMovies);
   authMainPage.append(authContainer);
   return authMainPage;
}

function createAuthTop(uid: string): HTMLElement {
   const containerEl: HTMLElement = addElement('div', 'auth__top');

   (async () => {
      const { displayName, createdAt }: userData = (await getUserData(uid)) as userData;
      const date: Date = new Date(createdAt);
      const longDate: string = new Intl.DateTimeFormat('ru', { dateStyle: 'long' }).format(date);

      const authContentEl: HTMLElement = addElement('div', 'auth__content');
      const authTitle: HTMLElement = addElement('h2', 'auth__title', 'Пользователь');
      const authNameEl: HTMLElement = addElement('div', 'auth__name', `Имя: ${displayName}`);
      const authDateEl: HTMLElement = addElement('div', 'auth__create', `Дата создания: ${longDate}`);
      const signOutBtn: HTMLElement = addElement('div', 'auth__sign-out-btn', 'Выйти');

      signOutBtn.addEventListener('click', signOutUser);
      authContentEl.append(authTitle, authNameEl, authDateEl);
      containerEl.append(authContentEl, signOutBtn);
   })();
   return containerEl;
}

function createAuthMovies(uid: string): HTMLElement {
   const containerEl: HTMLElement = addElement('div', 'auth__movies-section');

   (async () => {
      const movieSectionTitle: HTMLElement = addElement('h2', 'auth__title', 'Избранные фильмы');
      const movieItem: HTMLElement = addElement('div', 'auth__movies-container');
      const noMovieEl: HTMLElement = addElement('div', 'auth__no-movie');
      const { movie } = (await getUserData(uid)) as userData;
      containerEl.append(movieSectionTitle);
      if (movie === undefined || movie.length === 0) {
         noMovieEl.innerHTML = 'Вы пока не добавили фильмы в избранное';
         containerEl.append(noMovieEl);
      } else {
         const movieArr: respFilm[] = [];
         for (let i = 0; i < movie.length; i++) {
            movieArr.push((await getFilm(movie[i])) as respFilm);
         }
         movieArr.forEach((i) => {
            createMoviePoster(movieItem, i);
         });
         containerEl.append(movieItem);
      }
   })();

   return containerEl;
}

function createMoviePoster(block: HTMLElement, data: respFilm): void {
   const film = data;
   const poster = document.createElement('div');
   const posterAnchor = document.createElement('a');
   const posterImg = document.createElement('img');
   const posterTitle = document.createElement('p');
   const posterDesc = document.createElement('p');
   const id = film.kinopoiskId;
   const pathname = `/movie/${id}`;

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

export function addDeleteFilm(e: Event): void {
   const filmId: string = getIDfromPathname();

   if (sessionStorage.getItem('user')) {
      const { uid }: userData = JSON.parse(sessionStorage.getItem('user') as string);
      const userDocRef: DocumentReference<DocumentData> = getUserDocRef(uid);
      if ((e.target as HTMLElement).classList.contains('active')) {
         deleteFilm(userDocRef, filmId);
         (e.target as HTMLElement).classList.remove('active');
      } else {
         addFilm(userDocRef, filmId);
         (e.target as HTMLElement).classList.add('active');
      }
   } else alert('Sign in first');
}
