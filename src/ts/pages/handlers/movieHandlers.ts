export function showAllSeasons(e: Event) {
   const serial: HTMLElement = document.querySelector('.serial') as HTMLElement;
   const button: HTMLElement = e.currentTarget as HTMLElement;
   serial.classList.toggle('_hidden');
   button.textContent = serial.classList.contains('_hidden') ? 'Показать все' : 'Скрыть все';
}