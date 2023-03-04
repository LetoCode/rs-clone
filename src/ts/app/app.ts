import showFooter from "../pages/components/footer";
import showHeader from "../pages/components/header";

export function showPage(cb: () => HTMLElement): void {

   const app: Element = document.getElementById('app') as Element;
   app.innerHTML = '';

   const header: HTMLElement = showHeader();
   const main: HTMLElement = cb();
   const footer: HTMLElement = showFooter();

   app.append(header, main, footer);
}
