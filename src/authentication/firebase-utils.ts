import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyB1xRJRbuP1nkuHZCtLehrxm255iRAjDsA',
   authDomain: 'rs-clone-kinopoisk.firebaseapp.com',
   projectId: 'rs-clone-kinopoisk',
   storageBucket: 'rs-clone-kinopoisk.appspot.com',
   messagingSenderId: '952386437036',
   appId: '1:952386437036:web:e6d627b7610b569badc409',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
   prompt: 'select_account',
});

export const auth = getAuth();
export const sighInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: any, restInfo: object = {}) => {
   const userDocRef = doc(db, 'users', userAuth.uid);
   const getUser = await getDoc(userDocRef);

   if (!getUser.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

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
