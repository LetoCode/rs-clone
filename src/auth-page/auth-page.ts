import * as App from '../ts/app/app';

export default function authPage(): void {
   App.showPage(createAuthPage);
}

function createAuthPage(): HTMLElement {
   const authMainPage = document.createElement('main');
   return authMainPage;
}
