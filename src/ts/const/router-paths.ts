import notFoundPage from '../pages/notFoundPage';
import homePage from '../pages/home';
import moviePage from '../pages/movie';
import testApi from '../pages/testKinopoiskApi';
import authenticationPage from '../../authentication/authentication';

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
   testapi: {
      cb: testApi,
      title: 'testKinopoiskApi',
   },
   authentication: {
      cb: authenticationPage,
      title: 'authentication',
   },
};

export default ROUTER_PATHS;
