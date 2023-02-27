import notFoundPage from '../pages/notFound';
import homePage from '../pages/home';
import moviePage from '../pages/movie';
import testApi from '../pages/testKinopoiskApi';
import personPage from '../pages/person';
import staffPage from '../pages/staff';
import filmsOrSeriesPage from '../pages/filmsSeries';
import authenticationPage from '../pages/authentication';
import authPage from '../pages/auth-page';

const ROUTER_PATHS: Paths = {
   '404': {
      cb: notFoundPage,
      title: '404 :(',
   },
   '/': {
      cb: homePage,
      title: 'PoiskKino',
   },
   'index.html': {
      cb: homePage,
      title: 'PoiskKino',
   },
   movie: {
      cb: moviePage,
      title: 'movie',
   },
   testapi: {
      cb: testApi,
      title: 'testKinopoiskApi',
   },
   authentication: {
      cb: authenticationPage,
      title: 'authentication',
   },
   auth: {
      cb: authPage,
      title: 'auth',
   },
};

export default ROUTER_PATHS;
