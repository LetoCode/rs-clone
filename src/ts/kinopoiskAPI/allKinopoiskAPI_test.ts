import * as controller from './controller';

const KINOPOISK_APIS: allKinopoiskAPIs[] = [
   {
      name: 'get premieres',
      cb: controller.getPremieres
   },
   {
      name: 'get film',
      cb: controller.getFilm
   },
   {
      name: 'get seasons',
      cb: controller.getSeasons
   },
   {
      name: 'get facts',
      cb: controller.getFacts
   },
   {
      name: 'get distributions',
      cb: controller.getDistributions
   },
   {
      name: 'get box office',
      cb: controller.getBoxOffice
   },
   {
      name: 'awards',
      cb: controller.getAwards
   },
   {
      name: 'top 250',
      cb: controller.getTOP250
   },
   {
      name: 'top 100',
      cb: controller.getTOP100
   },
   {
      name: 'top awaiy',
      cb: controller.getTOPAwait
   },
   {
      name: 'videos',
      cb: controller.getVideos
   },
   {
      name: 'similars',
      cb: controller.getSimilars
   },
   {
      name: 'images',
      cb: controller.getImages
   },
   {
      name: 'reviews',
      cb: controller.getReviews
   },
   {
      name: 'filters',
      cb: controller.getFilters
   },
   {
      name: 'films',
      cb: controller.getFilmsWithFilters
   },
   {
      name: 'Sequels And Prequels',
      cb: controller.getSequelsAndPrequels
   },
   {
      name: 'search By Key Word',
      cb: controller.getFilmsByKeyWord
   },
   {
      name: 'film staff',
      cb: controller.getStaff
   },
   {
      name: 'person by Id',
      cb: controller.getPersonById
   },
   {
      name: 'persons by name',
      cb: controller.getPersonsByName
   },

]

export default KINOPOISK_APIS;