import signInForm from './signInForm';
import signUpForm from './signUpForm';
import { sighInWithGooglePopup, createUserDocumentFromAuth, createUser, signIn } from './firebase-utils';
import * as App from '../ts/app/app';

export default function authenticationPage(): void {
   App.showPage(createAuthenticationPage);
   addSignInListener();
   addSignUpListener();
}

function createAuthenticationPage(): HTMLElement {
   const authenticationEl: HTMLElement = document.createElement('div');
   authenticationEl.className = 'authentication__content';
   const signInFormEl = signInForm();
   const signUpFormEl = signUpForm();
   authenticationEl.innerHTML = `
      ${signInFormEl}
      ${signUpFormEl}
   `;
   return authenticationEl;
}

function addSignInListener() {
   const signInBtn = document.querySelector('.signIn');
   const signInGoogleBtn = document.querySelector('.signInWithGoogle');
   const signInInputs = document.querySelectorAll('.signInInputs');

   const formFields = {
      email: '',
      password: '',
   };

   const logGoogleUser = async () => {
      const { user } = await sighInWithGooglePopup();
      await createUserDocumentFromAuth(user);
   };

   signInGoogleBtn?.addEventListener('click', logGoogleUser);

   signInInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
         e.preventDefault();
         const key = (e.target as HTMLInputElement).name as keyof typeof formFields;
         formFields[key] = (e.target as HTMLInputElement).value as string;
      });
   });

   signInBtn?.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
         const res = await signIn(formFields.email, formFields.password);
         console.log(res);
         signInInputs.forEach((input) => {
            (input as HTMLInputElement).value = '';
         });
      } catch (err: unknown) {
         console.error(`Unknown error: ${err}`);
      }
   });
}

function addSignUpListener(): void {
   const signUpBtn = document.querySelector('.sign-up-btn');
   const signUpInputs = document.querySelectorAll('.signUpInputs');

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

         signUpInputs.forEach((input) => {
            (input as HTMLInputElement).value = '';
         });
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
