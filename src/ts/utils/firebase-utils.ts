import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, Auth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';

const firebaseConfig = {
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
export const sighInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db: Firestore = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: User, restInfo: object = {}) => {
   const userDocRef = doc(db, 'users', userAuth.uid);
   const getUser = await getDoc(userDocRef);
   console.log(getUser);
   if (!getUser.exists()) {
      const { displayName, email } = userAuth;
      const createdAt: Date = new Date();

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
};

export const createUser = async (email: string, password: string) => {
   return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
   return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (/*auth: Auth*/) => {
   //  signOut(auth);
   sessionStorage.removeItem('user');
   console.log('deleted');
};

export async function getUserData(uid: string) {
   const userDocRef = doc(db, 'users', uid);
   const getUser = await getDoc(userDocRef);
   return getUser.data();
}

export async function storage(uid: string) {
   sessionStorage.setItem('user', JSON.stringify(Object.assign({ uid: uid }, await getUserData(uid))));
}
