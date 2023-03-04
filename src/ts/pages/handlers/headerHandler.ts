
export function addBurgerListener(): void {

   const burger: HTMLElement = document.querySelector('.header__burger') as HTMLElement;
   const menu: HTMLElement = document.querySelector('.header__nav_burger') as HTMLElement;

   burger.addEventListener('click', function (): void {
      toggleBurger();
   })

   function toggleBurger(): void {
      burger.classList.toggle('_active');
      menu.classList.toggle('_active');
      document.body.classList.toggle('_lock');
   }


}