import { getFilmsWithFilters, getTOP100, getTOP250, getTOPAwait } from "../../kinopoiskAPI/controller";

export const filmsDataset: dataset<listTOP> = {
   top250: {
      isTop: true,
      name: 'top250',
      title: '250 лучших фильмов',
      getData: getTOP250,
   },
   top100: {
      isTop: true,
      name: 'top100',
      title: '100 самых популярных фильмов',
      getData: getTOP100,
   },
   topAwait: {
      isTop: true,
      name: 'topAwait',
      title: 'Самые ожидаемые фильмы',
      getData: getTOPAwait,
   },
}

export const filmsGenresDataset: dataset<listFilms> = {
   comedy: {
      name: 'comedy',
      title: 'Комедии',
      getData: getFilmsWithFilters,
      argums: {
         genres: 7,
         filmsOrder: 'RATING',
         filmsType: 'FILM',
      }
   },
   cartoon: {
      name: 'cartoon',
      title: 'Мультфильмы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 7,
         filmsOrder: 'RATING',
         filmsType: 'FILM',
      }
   },
   horror: {
      name: 'horror',
      title: 'Ужасы',
      getData: getFilmsWithFilters,
   },
}