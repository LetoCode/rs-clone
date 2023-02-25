import { DocumentReference, DocumentData } from 'firebase/firestore';
import { getUserDocRef, addFilm, deleteFilm } from '../ts/utils/firebase-utils';
import * as App from '../ts/app/app';

export default function authPage(): void {
   App.showPage(createAuthPage);
}

function createAuthPage(): HTMLElement {
   const authMainPage = document.createElement('main');
   return authMainPage;
}

export function addDeleteFilm(e: Event): void {
   const filmId: string = window.location.search.replace('?', '');
   const { uid } = JSON.parse(sessionStorage.getItem('user') as string);
   const userDocRef: DocumentReference<DocumentData> = getUserDocRef(uid);
   if ((e.target as HTMLElement).classList.contains('active')) {
      deleteFilm(userDocRef, filmId);
      (e.target as HTMLElement).classList.remove('active');
   } else {
      addFilm(userDocRef, filmId);
      (e.target as HTMLElement).classList.add('active');
   }
}
