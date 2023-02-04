import { getFromAPI } from "./loader";
import { getRequestOptions, getRequestURL } from "./reqBuilder";

//получить список премьер
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

//получить данные о фильме
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

//получить данные о сезонах сериала
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

//получить данные о фактах
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

//получить данные о прокате в разных странах.
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

//получить данные о бюджете и сборах
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

//получить данные о наградах и премиях фильма
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

//Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
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

//Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
export async function getTOP100(page = 1): Promise<respTop | string> {
   const params = `?type=TOP_100_POPULAR_FILM&page=${page}`;
   const requestParams = {
      APItarget: 'top100',
      params,
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respTop>(requestURL, requestOptions);
   return data;
}

//Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
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


//трейлеры,тизеры,видео для фильма по kinopoisk film id
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


//похожие фильмы
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

//возвращает изображения связанные с фильмом с пагинацией. 
//Каждая страница содержит не более чем 20 фильмов.
/*Доступные изображения:
STILL - кадры
SHOOTING - изображения со съемок
POSTER - постеры
FAN_ART - фан-арты
PROMO - промо
CONCEPT - концепт-арты
WALLPAPER - обои
COVER - обложки
SCREENSHOT - скриншоты
*/
export async function getImages(id: string, page = 1, imageType: filmImagesTypes = 'STILL'): Promise<respImages | string> {
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

//Возвращает список рецензии зрителей с пагинацией. Каждая страница содержит не более чем 20 рецензий.
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

//Возвращает список id стран и жанров, которые могут быть использованы в /api/v2.2/films
export async function getFilters(): Promise<respFilters | string> {
   const requestParams = {
      APItarget: 'filters',
   }
   const requestURL: string = getRequestURL(requestParams);
   const requestOptions: requestOptions = getRequestOptions();
   const data = await getFromAPI<respFilters>(requestURL, requestOptions);
   return data;
}


//Возвращает список фильмов с пагинацией. 
//Каждая страница содержит не более чем 20 фильмов. 
//Данный эндпоинт не возращает более 400 фильмов. 
//Используй /api/v2.2/films/filters чтобы получить id стран и жанров.
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

   // список id стран разделенные запятой. Например countries=1,2,3. 
   //На данный момент можно указать не более одной страны.
   // список id жанров разделенные запятой. Например genres=1,2,3. 
   //На данный момент можно указать не более одного жанра.
   // /v2.2/films?countries=1&genres=1&order=RATING&type=ALL&ratingFrom=8&ratingTo=10&yearFrom=1000&yearTo=3000&imdbId=11&keyword=gold&page=1'

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


//сиквелы и приквелы
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


//Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
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


//Получить данные об атерах, режиссерах и пр.
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

//Получить данные об атерах, режиссерах и пр.по ID
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

//Получить данные об атерах, режиссерах и пр. по Имени
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
