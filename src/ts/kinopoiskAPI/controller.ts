import { getFromAPI } from "./loader";
import { getRequestOptions, getRequestURL } from "./reqBuilder";

//get list of premiers
export async function getPremieres(year: string, month: string): Promise<respPremieres | string> {
   const params = `?year=${year}&month=${month.toUpperCase()}`;
   const requestParams = {
      APItarget: 'premieres',
      params,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respPremieres>(requestURL, requestOptions);
   return data;
}

//get film data
export async function getFilm(id: string): Promise<respFilm | string> {
   const requestParams = {
      APItarget: 'film',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respFilm>(requestURL, requestOptions);
   return data;
}

//get data about series seasons
export async function getSeasons(id: string): Promise<respSeasons | string> {
   const requestParams = {
      APItarget: 'seasons',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respSeasons>(requestURL, requestOptions);
   return data;
}

//get data about facts
export async function getFacts(id: string): Promise<respFacts | string> {
   const requestParams = {
      APItarget: 'facts',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respFacts>(requestURL, requestOptions);
   return data;
}

//get rental data in different countries
export async function getDistributions(id: string): Promise<respDistributions | string> {
   const requestParams = {
      APItarget: 'distributions',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respDistributions>(requestURL, requestOptions);
   return data;
}

//get budget and fees data
export async function getBoxOffice(id: string): Promise<respBoxOffice | string> {
   const requestParams = {
      APItarget: 'boxOffice',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respBoxOffice>(requestURL, requestOptions);
   return data;
}

//get data about movie awards and prizes
export async function getAwards(id: string): Promise<respAwards | string> {
   const requestParams = {
      APItarget: 'awards',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respAwards>(requestURL, requestOptions);
   return data;
}

//Returns a list of paginated movies. Each page contains no more than 20 films.
export async function getTOP250(page = 1): Promise<respTop | string> {
   const params = `?type=TOP_250_BEST_FILMS&page=${page}`;
   const requestParams = {
      APItarget: 'top250',
      params,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respTop>(requestURL, requestOptions);
   return data;
}

//Returns a list of paginated movies. Each page contains no more than 20 films.
export async function getTOP100(page = 1): Promise<respTop | string> {
   const params = `?type=TOP_100_POPULAR_FILMS&page=${page}`;
   const requestParams = {
      APItarget: 'top100',
      params,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respTop>(requestURL, requestOptions);
   return data;
}

//Returns a list of paginated movies. Each page contains no more than 20 films.
export async function getTOPAwait(page = 1): Promise<respTop | string> {
   const params = `?type=TOP_AWAIT_FILMS&page=${page}`;
   const requestParams = {
      APItarget: 'topAwait',
      params,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respTop>(requestURL, requestOptions);
   return data;
}


//trailers, teasers, videos for the film by kinopoisk film id
export async function getVideos(id: string): Promise<respVideos | string> {
   const requestParams = {
      APItarget: 'videos',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respVideos>(requestURL, requestOptions);
   return data;
}


//similar films
export async function getSimilars(id: string): Promise<respSimilars | string> {
   const requestParams = {
      APItarget: 'similars',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respSimilars>(requestURL, requestOptions);
   return data;
}

//returns images associated with a paginated movie.
//Each page contains no more than 20 movies.
/*Available images:
STILL - frames
SHOOTING - images from filming
POSTER - posters
FAN_ART - fan-arts
PROMO - promo
CONCEPT - concept-art
WALLPAPER - wallpaper
COVER - covers
SCREENSHOT - screenshots
*/
export async function getImages(id: string, page = 1, imageType: filmImagesTypes = 'SHOOTING'): Promise<respImages | string> {
   const params = `?type=${imageType.toUpperCase()}&page=${page}`;
   const requestParams = {
      APItarget: 'images',
      id,
      params
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respImages>(requestURL, requestOptions);
   return data;
}

//Returns a list of viewer reviews with pagination. Each page contains no more than 20 reviews.
export async function getReviews(id: string, page = 1, sortType: reviewsSortTypes = 'DATE_DESC'): Promise<respReviews | string> {
   const params = `?order=${sortType.toUpperCase()}&page=${page}`;
   const requestParams = {
      APItarget: 'reviews',
      id,
      params
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respReviews>(requestURL, requestOptions);
   return data;
}

//Returns a list of id's of countries and genres that can be used in /api/v2.2/films
export async function getFilters(): Promise<respFilters | string> {
   const requestParams = {
      APItarget: 'filters',
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respFilters>(requestURL, requestOptions);
   return data;
}


//Returns a list of paginated movies.
//Each page contains no more than 20 movies.
//This endpoint does not return more than 400 movies.
//Use /api/v2.2/films/filters to get country and genre ids.
export async function getFilmsWithFilters(
   { country,
      genres,
      filmsOrder = 'RATING',
      filmsType = 'ALL',
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
      imdbId,
      keyword,
      page = 1 }: argumentForFilmSearch
): Promise<respfilmsWithFilters | string> {

   // list of id countries separated by a comma. For example countries=1,2,3.
   //At the moment, you can specify no more than one country.
   // comma-separated list of genre ids. For example genres=1,2,3.
   //At the moment, you can specify no more than one genre.
   let params = '?';
   params += `order=${filmsOrder}&`;
   params += `type=${filmsType}&`;
   params += `page=${page}&`;
   if (country) params += `countries=${country}&`;
   if (genres) params += `genres=${genres}&`;
   if (ratingFrom) params += `ratingFrom=${ratingFrom}&`;
   if (ratingTo) params += `ratingTo=${ratingTo}&`;
   if (yearFrom) params += `yearFrom=${yearFrom}&`;
   if (yearTo) params += `yearTo=${yearTo}&`;
   if (imdbId) params += `imdbId=${imdbId}&`;
   if (keyword) params += `keyword=${keyword}&`;
   params = params.slice(0, -1);
   const requestParams = {
      APItarget: 'films',
      params
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respfilmsWithFilters>(requestURL, requestOptions);
   return data;
}


//sequels and prequels
export async function getSequelsAndPrequels(id: string): Promise<SequelAndPrequel[] | string> {
   const requestParams = {
      APItarget: 'sequelAndPrequel',
      id,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<SequelAndPrequel[]>(requestURL, requestOptions);
   return data;
}


//Returns a list of paginated movies. Each page contains no more than 20 films.
export async function getFilmsByKeyWord(keyword: string, page = 1): Promise<FilmsByKeyWord | string> {
   const params = `?keyword=${keyword}&page=${page}`;
   const requestParams = {
      APItarget: 'searchByKey',
      params
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<FilmsByKeyWord>(requestURL, requestOptions);
   return data;
}


//Get data about actors, directors, etc.
export async function getStaff(filmId: string): Promise<FilmStaffItem[] | string> {
   const params = `?filmId=${filmId}`;
   const requestParams = {
      APItarget: 'staff',
      params
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<FilmStaffItem[]>(requestURL, requestOptions);
   return data;
}

//Get data about actors, directors, etc. by ID
export async function getPersonById(id: string): Promise<PersonByID | string> {
   const requestParams = {
      APItarget: 'personById',
      id
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<PersonByID>(requestURL, requestOptions);
   return data;
}

//Get data about actors, directors, etc. by Name
export async function getPersonsByName(name: string, page = 1): Promise<PersonsByName | string> {
   const params = `?name=${name}&page=${page}`;
   const requestParams = {
      APItarget: 'personsByName',
      params
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<PersonsByName>(requestURL, requestOptions);
   return data;
}
