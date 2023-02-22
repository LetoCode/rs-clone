import notFoundPage from "../pages/notFound";
import homePage from "../pages/home";
import moviePage from "../pages/movie";
import testApi from "../pages/testKinopoiskApi";
import personPage from "../pages/person";
import staffPage from "../pages/staff";
import authenticationPage from '../pages/authentication';

const ROUTER_PATHS: Paths = {
   '404': {
      cb: notFoundPage,
      title: '404 :(',
   },
   '/': {
      cb: homePage,
      title: 'PoiskKino',
   },
   movie: {
      cb: moviePage,
      title: 'movie',
   },
   'testapi': {
      cb: testApi,
      title: 'testKinopoiskApi',
   },
   authentication: {
      cb: authenticationPage,
      title: 'authentication',
   },
};

export default ROUTER_PATHS;
