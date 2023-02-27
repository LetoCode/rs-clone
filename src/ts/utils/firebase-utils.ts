import { FirebaseApp, initializeApp } from 'firebase/app';
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   User,
   Auth,
   UserCredential,
   signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore, updateDoc, DocumentReference, DocumentData, arrayUnion, arrayRemove } from 'firebase/firestore';
import { router } from '../router/router';

const firebaseConfig: firebaseConfig = {
   apiKey: 'AIzaSyB1xRJRbuP1nkuHZCtLehrxm255iRAjDsA',
   authDomain: 'rs-clone-kinopoisk.firebaseapp.com',
   projectId: 'rs-clone-kinopoisk',
   storageBucket: 'rs-clone-kinopoisk.appspot.com',
   messagingSenderId: '952386437036',
   appId: '1:952386437036:web:e6d627b7610b569badc409',
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
   prompt: 'select_account',
});

export const auth: Auth = getAuth();

export function sighInWithGooglePopup(): Promise<UserCredential> {
   return signInWithPopup(auth, googleProvider);
}

export const db: Firestore = getFirestore();

export async function createUserDocumentFromAuth(userAuth: User, restInfo: object = {}): Promise<DocumentReference<DocumentData>> {
   const userDocRef = doc(db, 'users', userAuth.uid);
   const getUser = await getDoc(userDocRef);
   if (!getUser.exists()) {
      const { displayName, email } = userAuth;
      const createdAt: number = Date.now();

      try {
         await setDoc(userDocRef, { displayName, email, createdAt, ...restInfo });
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error(`Error: ${err.name}, Message: ${err.message}`);
         } else {
            console.error(`Unknown error: ${err}`);
         }
      }
   }

   return userDocRef;
}

export async function createUser(email: string, password: string): Promise<UserCredential> {
   return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string): Promise<UserCredential> {
   return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser(): Promise<void> {
   signOut(auth);
   sessionStorage.removeItem('user');
   router('/');
}

export async function getUserData(uid: string) {
   const userDocRef = getUserDocRef(uid);
   const getUser = await getDoc(userDocRef);
   return getUser.data();
}

export async function storage(uid: string): Promise<void> {
   sessionStorage.setItem('user', JSON.stringify(Object.assign({ uid: uid }, await getUserData(uid))));
}

export async function updateUserDoc(userDocRef: DocumentReference<DocumentData>, obj: object = {}) {
   updateDoc(userDocRef, obj);
}

export function deleteFilm(userDocRef: DocumentReference<DocumentData>, filmId: string) {
   updateDoc(userDocRef, { movie: arrayRemove(filmId) });
}
export function addFilm(userDocRef: DocumentReference<DocumentData>, filmId: string) {
   updateDoc(userDocRef, { movie: arrayUnion(filmId) });
}

export function getUserDocRef(uid: string) {
   return doc(db, 'users', uid);
}
