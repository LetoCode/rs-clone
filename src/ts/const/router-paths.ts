import notFoundPage from "../pages/notFound";
import homePage from "../pages/home";
import moviePage from "../pages/movie";
import testApi from "../pages/testKinopoiskApi";
import personPage from "../pages/person";

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
      title: 'movie'
   },
   'person': {
      cb: personPage,
      title: 'person'
   },
   'testapi': {
      cb: testApi,
      title: 'testKinopoiskApi'
   }

}

export default ROUTER_PATHS;
