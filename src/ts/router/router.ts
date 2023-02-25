import ROUTER_PATHS from "../const/router-paths";

export function handleRoute(pathname: string): void {
   console.log('pathname', pathname);
   pathname = pathname.replace(/^\//, '').replace(/$\//, '').split('/')[0].replace(/(.+)(\?.+)/g, '$1');
   console.log('pathname2', pathname);
   const endpoints: string[] = pathname.split('/');
   const firstEndpoint: string = endpoints[0] || '/';
   console.log('firstEndpoint', firstEndpoint);
   const thisRoute: Path = ROUTER_PATHS[firstEndpoint] || ROUTER_PATHS['404'];
   console.log('thisRoute', thisRoute);

   document.title = thisRoute.title;
   thisRoute.cb();
}

handleRoute(window.location.pathname);

window.addEventListener('popstate', (): void => {
   handleRoute(window.location.pathname);
});


export const router = (pathname: string): void => {
   window.history.pushState({}, '', window.location.origin + pathname);
   handleRoute(pathname);
};
