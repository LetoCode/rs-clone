import { getFilmsWithFilters, getTOP100, getTOP250, getTOPAwait } from "../../kinopoiskAPI/controller";

export const filmsDataset: listTOP[] = [
   {
      isTop: true,
      name: 'top250',
      title: '250 лучших фильмов',
      getData: getTOP250,
   },
   {
      isTop: true,
      name: 'top100',
      title: '100 самых популярных фильмов',
      getData: getTOP100,
   },
   {
      isTop: true,
      name: 'topAwait',
      title: 'Самые ожидаемые фильмы',
      getData: getTOPAwait,
   },
]

export const filmsGenresDataset: listFilms[] = [
   {
      isTop: false,
      name: 'comedy',
      title: 'Комедии',
      getData: getFilmsWithFilters,
      argums: {
         genres: 13,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'cartoon',
      title: 'Мультфильмы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 18,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'horror',
      title: 'Ужасы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 18,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'fantastic',
      title: 'Фантастика',
      getData: getFilmsWithFilters,
      argums: {
         genres: 6,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'thriller',
      title: 'Триллеры',
      getData: getFilmsWithFilters,
      argums: {
         genres: 1,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'action',
      title: 'Боевики',
      getData: getFilmsWithFilters,
      argums: {
         genres: 11,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'melodrama',
      title: 'Мелодрамы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 4,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'detective',
      title: 'Детективы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 5,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'adventures',
      title: 'Приключения',
      getData: getFilmsWithFilters,
      argums: {
         genres: 7,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'fantasy',
      title: 'Фэнтези',
      getData: getFilmsWithFilters,
      argums: {
         genres: 12,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'military',
      title: 'Военные',
      getData: getFilmsWithFilters,
      argums: {
         genres: 14,
         filmsType: 'FILM',
      }
   },
]

export const seriesGenresDataset: listFilms[] = filmsGenresDataset.map(a => {return {...a}});
seriesGenresDataset.map((item: listFilms) => {
   item.name += '-s';
   item.argums = {
      genres: item.argums.genres,
      filmsType: 'TV_SERIES',
   }
   return item;
});
