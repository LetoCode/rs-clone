import ROUTER_PATHS from "../const/router-paths";

function handleRoute(pathname: string): void {
   console.log(pathname);
   pathname = pathname.replace(/^\//, '').replace(/$\//, '')
   const endpoints: string[] = pathname.split('/');
   const firstEndpoint: string = endpoints[0] || '/';
   const thisRoute: Path = ROUTER_PATHS[firstEndpoint] || ROUTER_PATHS['404'];

   document.title = thisRoute.title;
   thisRoute.cb();
}

handleRoute(window.location.pathname);

window.addEventListener('popstate', (): void => {
   handleRoute(window.location.pathname);
});
