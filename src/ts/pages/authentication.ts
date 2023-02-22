import signInForm from './components/sign-in-form';
import signUpForm from './components/sign-up-form';
import { sighInWithGooglePopup, createUserDocumentFromAuth, createUser, signIn, storage } from '../utils/firebase-utils';
import * as App from '../app/app';
import { router } from '../router/router';

export default function authenticationPage(): void {
   App.showPage(createAuthenticationPage);
   addSignInListener();
   addSignUpListener();
}

function createAuthenticationPage(): HTMLElement {
   const authenticationMainEl: HTMLElement = document.createElement('main');
   const authenticationEl: HTMLElement = document.createElement('div');
   authenticationMainEl.className = 'main';
   authenticationEl.className = 'authentication__content';

   const signInFormEl = signInForm();
   const signUpFormEl = signUpForm();
   authenticationEl.innerHTML = `
      ${signInFormEl}
      ${signUpFormEl}
   `;
   authenticationMainEl.append(authenticationEl);
   return authenticationMainEl;
}

function addSignInListener(): void {
   const signInBtn = document.querySelector('.authentication__sign-email');
   const signInGoogleBtn = document.querySelector('.authentication__sign-google');
   const signInInputs = document.querySelectorAll('.authentication__sign-in-inputs');

   const formFields = {
      email: '',
      password: '',
   };

   async function logGoogleUser(): Promise<void> {
      const { user } = await sighInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      await storage(user.uid);
      router('/');
   }

   signInGoogleBtn?.addEventListener('click', logGoogleUser);

   signInInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
         e.preventDefault();
         const key = (e.target as HTMLInputElement).name as keyof typeof formFields;
         formFields[key] = (e.target as HTMLInputElement).value as string;
      });
   });

   async function signInFunc(e: Event): Promise<void> {
      e.preventDefault();
      try {
         if (formFields.email === '') return alert('Fill in the email field');
         if (formFields.password === '') return alert('Fill in the password field');
         const res = await signIn(formFields.email, formFields.password);
         await storage(res.user.uid);
         router('/');
      } catch (err: unknown) {
         if (err instanceof Error) {
            alert(`Error: ${err.name}, Message: ${err.message}`);
         } else {
            console.error(`Unknown error: ${err}`);
         }
      }
   }

   signInBtn?.addEventListener('click', signInFunc);
}

function addSignUpListener(): void {
   const signUpBtn = document.querySelector('.authentication__sign-up-btn');
   const signUpInputs = document.querySelectorAll('.authentication__sign-up-inputs');

   const formFields = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
   };

   signUpBtn?.addEventListener('click', async (e) => {
      e.preventDefault();
      if (formFields.password !== formFields.confirmPassword) {
         alert("Passwords don't match!");
         return;
      }
      try {
         const { user } = await createUser(formFields.email, formFields.password);
         await createUserDocumentFromAuth(user, { displayName: formFields.displayName });
         await signIn(formFields.email, formFields.password);
         await storage(user.uid);
         router('/');
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error(`Error: ${err.name}, Message: ${err.message}`);
         } else {
            console.error(`Unknown error: ${err}`);
         }
      }
   });

   signUpInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
         e.preventDefault();
         const key = (e.target as HTMLInputElement).name as keyof typeof formFields;
         formFields[key] = (e.target as HTMLInputElement).value as string;
      });
   });
}
