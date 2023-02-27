export const DOMAIN = 'https://kinopoiskapiunofficial.tech/api';
//export const API_KEY = '66723cba-ea77-458f-80d5-57e3db4430c1';
//export const API_KEY = '859e945d-207a-47dd-afea-0c28e7067f8a';
//export const API_KEY = '8c4d0f91-cacb-4c70-9528-b59b313497bb';
//export const API_KEY = '092ee281-33c1-4042-b861-55bc57b55677';

export const API_KEYS: string[] = [
   '859e945d-207a-47dd-afea-0c28e7067f8a',
   '8c4d0f91-cacb-4c70-9528-b59b313497bb',
   '092ee281-33c1-4042-b861-55bc57b55677',
   '66723cba-ea77-458f-80d5-57e3db4430c1',
   '8167b251-d760-4ba3-9312-1fc06c47db00',
   'cf8d7ed7-bb71-4966-b14e-9426b9242d99'
];

export const USED_API_KEYS: string[] = [];

export const KINOPOISK_URLS: kinopoiskURLs = {
   'premieres': 'v2.2/films/premieres',
   'film': 'v2.2/films/{id}',
   'seasons': 'v2.2/films/{id}/seasons',
   'facts': 'v2.2/films/{id}/facts',
   'distributions': 'v2.2/films/{id}/distributions',
   'boxOffice': 'v2.2/films/{id}/box_office',
   'awards': 'v2.2/films/{id}/awards',
   'top250': 'v2.2/films/top',
   'top100': 'v2.2/films/top',
   'topAwait': 'v2.2/films/top',
   'videos': 'v2.2/films/{id}/videos',
   'similars': 'v2.2/films/{id}/similars',
   'images': 'v2.2/films/{id}/images',
   'reviews': 'v2.2/films/{id}/reviews',
   'filters': 'v2.2/films/filters',
   'films': 'v2.2/films',
   'sequelAndPrequel': 'v2.1/films/{id}/sequels_and_prequels',
   'searchByKey': 'v2.1/films/search-by-keyword',
   'staff': 'v1/staff',
   'personById': 'v1/staff/{id}',
   'personsByName': 'v1/persons',
}