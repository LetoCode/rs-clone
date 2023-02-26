import ROUTER_PATHS from "../const/router-paths";

export function handleRoute(pathname: string): void {
   pathname = pathname.replace(/^\//, '').replace(/$\//, '').split('/')[0].replace(/(.+)(\?.+)/g, '$1');
   const endpoints: string[] = pathname.split('/');
   const firstEndpoint: string = endpoints[0] || '/';
   const thisRoute: Path = ROUTER_PATHS[firstEndpoint] || ROUTER_PATHS['404'];
   document.title = thisRoute.title;
   thisRoute.cb();
}

handleRoute(window.location.pathname);

window.addEventListener('popstate', (): void => {
   if (!window.location.hash) {
      handleRoute(window.location.pathname);
   }
});


export const router = (pathname: string): void => {
   window.history.pushState({}, '', window.location.origin + pathname);
   handleRoute(pathname);
};
