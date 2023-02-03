import ROUTER_PATHS from "../const/router-paths";

function handleRoute(pathname: string): void {
   console.log(pathname);
   pathname = pathname.replace(/^\//, '').replace(/$\//, '')
   const endpoints = pathname.split('/');
   const firstEndpoint = endpoints[0] || '/';
   const thisRoute = ROUTER_PATHS[firstEndpoint] || ROUTER_PATHS['404'];

   document.title = thisRoute.title;
   thisRoute.cb();
}

handleRoute(window.location.pathname);

window.addEventListener('popstate', (): void => {
   handleRoute(window.location.pathname);
});
