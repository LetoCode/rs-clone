export function getIDfromPathname(): string {
   return window.location.pathname.replace(/^\//, '').replace(/$\//, '').split('/')[1].replace(/(.+)(\?.+)/g, '$1');
}