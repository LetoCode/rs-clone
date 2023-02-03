import notFoundPage from "../pages/notFoundPage";
import homePage from "../pages/home";
import moviePage from "../pages/movie";

const ROUTER_PATHS: Paths = {
   '404': {
      cb: notFoundPage,
      title: '404 :('
   },
   '/': {
      cb: homePage,
      title: 'PoiskKino'
   },
   'movie': {
      cb: moviePage,
      title: 'PoiskKino'
   }

}

export default ROUTER_PATHS;
