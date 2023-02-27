import { getFilmsWithFilters, getTOP100, getTOP250, getTOPAwait } from "../../kinopoiskAPI/controller";

const date = new Date();
const year = date.getFullYear();

export const filmsTOP: listTOP[] = [
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

export const seriesLists: listFilms[] = [
   {
      isTop: false,
      name: 'best-s',
      title: '100 лучших сериалов',
      getData: getFilmsWithFilters,
      argums: {
         filmsType: 'TV_SERIES',
      }
   },
   {
      isTop: false,
      name: '2022-s',
      title: `Лучшие сериалы-${year - 1}`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 1,
         yearTo: year - 1,
         filmsType: 'TV_SERIES',
      }
   },
   {
      isTop: false,
      name: 'new-s',
      title: 'Новинки',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 1,
         yearTo: year,
         filmsType: 'TV_SERIES',
      }
   },
   {
      isTop: false,
      name: '21century-s',
      title: '100 великих сериалов XXI века',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 2001,
         yearTo: year - 1,
         filmsType: 'TV_SERIES',
      }
   },
   {
      isTop: false,
      name: 'miniseries-s',
      title: 'Мини-сериалы',
      getData: getFilmsWithFilters,
      argums: {
         filmsType: 'MINI_SERIES',
      }
   },
]

export const filmsYears: listFilms[] = [
   {
      isTop: false,
      name: `${year - 1}`,
      title: `${year - 1} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 1,
         yearTo: year - 1,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 2}`,
      title: `${year - 2} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 2,
         yearTo: year - 2,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 3}`,
      title: `${year - 3} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 3,
         yearTo: year - 3,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 4}`,
      title: `${year - 4} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 4,
         yearTo: year - 4,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 5}`,
      title: `${year - 5} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 5,
         yearTo: year - 5,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 6}`,
      title: `${year - 6} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 6,
         yearTo: year - 6,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 7}`,
      title: `${year - 7} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 7,
         yearTo: year - 7,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `${year - 8}`,
      title: `${year - 8} год`,
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: year - 8,
         yearTo: year - 8,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `2010s`,
      title: '2010-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 2010,
         yearTo: 2019,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `2000s`,
      title: '2000-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 2000,
         yearTo: 2009,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1990s`,
      title: '1990-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1990,
         yearTo: 1999,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1980s`,
      title: '1980-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1980,
         yearTo: 1989,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1970s`,
      title: '1970-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1970,
         yearTo: 1979,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1960s`,
      title: '1960-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1960,
         yearTo: 1969,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1950s`,
      title: '1950-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1950,
         yearTo: 1959,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1940s`,
      title: '1940-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1940,
         yearTo: 1949,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1930s`,
      title: '1930-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1930,
         yearTo: 1939,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1920s`,
      title: '1920-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1920,
         yearTo: 1929,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1910s`,
      title: '1910-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1910,
         yearTo: 1919,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1900s`,
      title: '1900-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1900,
         yearTo: 1909,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: `1890s`,
      title: '1890-ые',
      getData: getFilmsWithFilters,
      argums: {
         yearFrom: 1890,
         yearTo: 1899,
         filmsType: 'FILM',
      }
   },
]

export const filmsGenres: listFilms[] = [
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
         genres: 17,
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
   {
      isTop: false,
      name: 'family',
      title: 'Семейные',
      getData: getFilmsWithFilters,
      argums: {
         genres: 19,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'anime',
      title: 'Аниме',
      getData: getFilmsWithFilters,
      argums: {
         genres: 24,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'history',
      title: 'Исторические',
      getData: getFilmsWithFilters,
      argums: {
         genres: 15,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'drama',
      title: 'Драмы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 2,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'documentary',
      title: 'Документальные',
      getData: getFilmsWithFilters,
      argums: {
         genres: 22,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'kids',
      title: 'Детские',
      getData: getFilmsWithFilters,
      argums: {
         genres: 33,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'crime',
      title: 'Криминал',
      getData: getFilmsWithFilters,
      argums: {
         genres: 3,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'biography',
      title: 'Биографии',
      getData: getFilmsWithFilters,
      argums: {
         genres: 8,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'western',
      title: 'Вестерны',
      getData: getFilmsWithFilters,
      argums: {
         genres: 10,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'noir',
      title: 'Фильмы-нуар',
      getData: getFilmsWithFilters,
      argums: {
         genres: 9,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'sport',
      title: 'Спортивные',
      getData: getFilmsWithFilters,
      argums: {
         genres: 21,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'realtv',
      title: 'Реальное ТВ',
      getData: getFilmsWithFilters,
      argums: {
         genres: 30,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'short',
      title: 'Короткометражки',
      getData: getFilmsWithFilters,
      argums: {
         genres: 23,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'music',
      title: 'Музыкальные',
      getData: getFilmsWithFilters,
      argums: {
         genres: 16,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'musical',
      title: 'Мюзиклы',
      getData: getFilmsWithFilters,
      argums: {
         genres: 20,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'talkshow',
      title: 'Ток-шоу',
      getData: getFilmsWithFilters,
      argums: {
         genres: 32,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'game',
      title: 'Игры',
      getData: getFilmsWithFilters,
      argums: {
         genres: 31,
         filmsType: 'FILM',
      }
   },
]

export const filmsCountries: listFilms[] = [
   {
      isTop: false,
      name: 'russia',
      title: 'Россия',
      getData: getFilmsWithFilters,
      argums: {
         country: 34,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'ussr',
      title: 'СССР',
      getData: getFilmsWithFilters,
      argums: {
         country: 33,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'usa',
      title: 'США',
      getData: getFilmsWithFilters,
      argums: {
         country: 1,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'france',
      title: 'Франция',
      getData: getFilmsWithFilters,
      argums: {
         country: 3,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'southkorea',
      title: 'Южная Корея',
      getData: getFilmsWithFilters,
      argums: {
         country: 49,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'uk',
      title: 'Великобритания',
      getData: getFilmsWithFilters,
      argums: {
         country: 5,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'japan',
      title: 'Япония',
      getData: getFilmsWithFilters,
      argums: {
         country: 16,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'italy',
      title: 'Италия',
      getData: getFilmsWithFilters,
      argums: {
         country: 10,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'spain',
      title: 'Испания',
      getData: getFilmsWithFilters,
      argums: {
         country: 8,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'germany',
      title: 'Германия',
      getData: getFilmsWithFilters,
      argums: {
         country: 9,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'turkey',
      title: 'Турция',
      getData: getFilmsWithFilters,
      argums: {
         country: 44,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'sweden',
      title: 'Швеция',
      getData: getFilmsWithFilters,
      argums: {
         country: 6,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'denmark',
      title: 'Дания',
      getData: getFilmsWithFilters,
      argums: {
         country: 17,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'norway',
      title: 'Норвегия',
      getData: getFilmsWithFilters,
      argums: {
         country: 22,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'hongkong',
      title: 'Гонконг',
      getData: getFilmsWithFilters,
      argums: {
         country: 11,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'australia',
      title: 'Австралия',
      getData: getFilmsWithFilters,
      argums: {
         country: 13,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'belgium',
      title: 'Бельгия',
      getData: getFilmsWithFilters,
      argums: {
         country: 45,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'netherlands',
      title: 'Нидерланды',
      getData: getFilmsWithFilters,
      argums: {
         country: 23,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'greece',
      title: 'Греция',
      getData: getFilmsWithFilters,
      argums: {
         country: 63,
         filmsType: 'FILM',
      }
   },
   {
      isTop: false,
      name: 'austria',
      title: 'Австрия',
      getData: getFilmsWithFilters,
      argums: {
         country: 27,
         filmsType: 'FILM',
      }
   },
]

export const seriesGenres: listFilms[] = filmsGenres.map(a => { return { ...a } });
seriesGenres.map((item: listFilms) => {
   item.name += '-s';
   item.argums = {
      genres: item.argums.genres,
      filmsType: 'TV_SERIES',
   }
   return item;
});

export const seriesCountries: listFilms[] = filmsCountries.map(a => { return { ...a } });
seriesCountries.map((item: listFilms) => {
   item.name += '-s';
   item.argums = {
      country: item.argums.country,
      filmsType: 'TV_SERIES',
   }
   return item;
});

export const seriesYears: listFilms[] = filmsYears.map(a => { return { ...a } }).slice(0, -7);
seriesYears.map((item: listFilms) => {
   item.name += '-s';
   item.argums = {
      yearFrom: item.argums.yearFrom,
      yearTo: item.argums.yearTo,
      filmsType: 'TV_SERIES',
   }
   return item;
});

const filters = {
   "genres": [
      {
         "id": 1,
         "genre": "триллер"
      },
      {
         "id": 2,
         "genre": "драма"
      },
      {
         "id": 3,
         "genre": "криминал"
      },
      {
         "id": 4,
         "genre": "мелодрама"
      },
      {
         "id": 5,
         "genre": "детектив"
      },
      {
         "id": 6,
         "genre": "фантастика"
      },
      {
         "id": 7,
         "genre": "приключения"
      },
      {
         "id": 8,
         "genre": "биография"
      },
      {
         "id": 9,
         "genre": "фильм-нуар"
      },
      {
         "id": 10,
         "genre": "вестерн"
      },
      {
         "id": 11,
         "genre": "боевик"
      },
      {
         "id": 12,
         "genre": "фэнтези"
      },
      {
         "id": 13,
         "genre": "комедия"
      },
      {
         "id": 14,
         "genre": "военный"
      },
      {
         "id": 15,
         "genre": "история"
      },
      {
         "id": 16,
         "genre": "музыка"
      },
      {
         "id": 17,
         "genre": "ужасы"
      },
      {
         "id": 18,
         "genre": "мультфильм"
      },
      {
         "id": 19,
         "genre": "семейный"
      },
      {
         "id": 20,
         "genre": "мюзикл"
      },
      {
         "id": 21,
         "genre": "спорт"
      },
      {
         "id": 22,
         "genre": "документальный"
      },
      {
         "id": 23,
         "genre": "короткометражка"
      },
      {
         "id": 24,
         "genre": "аниме"
      },
      {
         "id": 25,
         "genre": ""
      },
      {
         "id": 26,
         "genre": "новости"
      },
      {
         "id": 27,
         "genre": "концерт"
      },
      {
         "id": 28,
         "genre": "для взрослых"
      },
      {
         "id": 29,
         "genre": "церемония"
      },
      {
         "id": 30,
         "genre": "реальное ТВ"
      },
      {
         "id": 31,
         "genre": "игра"
      },
      {
         "id": 32,
         "genre": "ток-шоу"
      },
      {
         "id": 33,
         "genre": "детский"
      }
   ],
   "countries": [
      {
         "id": 1,
         "country": "США"
      },
      {
         "id": 2,
         "country": "Швейцария"
      },
      {
         "id": 3,
         "country": "Франция"
      },
      {
         "id": 4,
         "country": "Польша"
      },
      {
         "id": 5,
         "country": "Великобритания"
      },
      {
         "id": 6,
         "country": "Швеция"
      },
      {
         "id": 7,
         "country": "Индия"
      },
      {
         "id": 8,
         "country": "Испания"
      },
      {
         "id": 9,
         "country": "Германия"
      },
      {
         "id": 10,
         "country": "Италия"
      },
      {
         "id": 11,
         "country": "Гонконг"
      },
      {
         "id": 12,
         "country": "Германия (ФРГ)"
      },
      {
         "id": 13,
         "country": "Австралия"
      },
      {
         "id": 14,
         "country": "Канада"
      },
      {
         "id": 15,
         "country": "Мексика"
      },
      {
         "id": 16,
         "country": "Япония"
      },
      {
         "id": 17,
         "country": "Дания"
      },
      {
         "id": 18,
         "country": "Чехия"
      },
      {
         "id": 19,
         "country": "Ирландия"
      },
      {
         "id": 20,
         "country": "Люксембург"
      },
      {
         "id": 21,
         "country": "Китай"
      },
      {
         "id": 22,
         "country": "Норвегия"
      },
      {
         "id": 23,
         "country": "Нидерланды"
      },
      {
         "id": 24,
         "country": "Аргентина"
      },
      {
         "id": 25,
         "country": "Финляндия"
      },
      {
         "id": 26,
         "country": "Босния и Герцеговина"
      },
      {
         "id": 27,
         "country": "Австрия"
      },
      {
         "id": 28,
         "country": "Тайвань"
      },
      {
         "id": 29,
         "country": "Новая Зеландия"
      },
      {
         "id": 30,
         "country": "Бразилия"
      },
      {
         "id": 31,
         "country": "Чехословакия"
      },
      {
         "id": 32,
         "country": "Мальта"
      },
      {
         "id": 33,
         "country": "СССР"
      },
      {
         "id": 34,
         "country": "Россия"
      },
      {
         "id": 35,
         "country": "Югославия"
      },
      {
         "id": 36,
         "country": "Португалия"
      },
      {
         "id": 37,
         "country": "Румыния"
      },
      {
         "id": 38,
         "country": "Хорватия"
      },
      {
         "id": 39,
         "country": "ЮАР"
      },
      {
         "id": 40,
         "country": "Куба"
      },
      {
         "id": 41,
         "country": "Колумбия"
      },
      {
         "id": 42,
         "country": "Израиль"
      },
      {
         "id": 43,
         "country": "Намибия"
      },
      {
         "id": 44,
         "country": "Турция"
      },
      {
         "id": 45,
         "country": "Бельгия"
      },
      {
         "id": 46,
         "country": "Сальвадор"
      },
      {
         "id": 47,
         "country": "Исландия"
      },
      {
         "id": 48,
         "country": "Венгрия"
      },
      {
         "id": 49,
         "country": "Корея Южная"
      },
      {
         "id": 50,
         "country": "Лихтенштейн"
      },
      {
         "id": 51,
         "country": "Болгария"
      },
      {
         "id": 52,
         "country": "Филиппины"
      },
      {
         "id": 53,
         "country": "Доминикана"
      },
      {
         "id": 54,
         "country": ""
      },
      {
         "id": 55,
         "country": "Марокко"
      },
      {
         "id": 56,
         "country": "Таиланд"
      },
      {
         "id": 57,
         "country": "Кения"
      },
      {
         "id": 58,
         "country": "Пакистан"
      },
      {
         "id": 59,
         "country": "Иран"
      },
      {
         "id": 60,
         "country": "Панама"
      },
      {
         "id": 61,
         "country": "Аруба"
      },
      {
         "id": 62,
         "country": "Ямайка"
      },
      {
         "id": 63,
         "country": "Греция"
      },
      {
         "id": 64,
         "country": "Тунис"
      },
      {
         "id": 65,
         "country": "Кыргызстан"
      },
      {
         "id": 66,
         "country": "Пуэрто Рико"
      },
      {
         "id": 67,
         "country": "Казахстан"
      },
      {
         "id": 68,
         "country": "Югославия (ФР)"
      },
      {
         "id": 69,
         "country": "Алжир"
      },
      {
         "id": 70,
         "country": "Германия (ГДР)"
      },
      {
         "id": 71,
         "country": "Сингапур"
      },
      {
         "id": 72,
         "country": "Словакия"
      },
      {
         "id": 73,
         "country": "Афганистан"
      },
      {
         "id": 74,
         "country": "Индонезия"
      },
      {
         "id": 75,
         "country": "Перу"
      },
      {
         "id": 76,
         "country": "Бермуды"
      },
      {
         "id": 77,
         "country": "Монако"
      },
      {
         "id": 78,
         "country": "Зимбабве"
      },
      {
         "id": 79,
         "country": "Вьетнам"
      },
      {
         "id": 80,
         "country": "Антильские Острова"
      },
      {
         "id": 81,
         "country": "Саудовская Аравия"
      },
      {
         "id": 82,
         "country": "Танзания"
      },
      {
         "id": 83,
         "country": "Ливия"
      },
      {
         "id": 84,
         "country": "Ливан"
      },
      {
         "id": 85,
         "country": "Кувейт"
      },
      {
         "id": 86,
         "country": "Египет"
      },
      {
         "id": 87,
         "country": "Литва"
      },
      {
         "id": 88,
         "country": "Венесуэла"
      },
      {
         "id": 89,
         "country": "Словения"
      },
      {
         "id": 90,
         "country": "Чили"
      },
      {
         "id": 91,
         "country": "Багамы"
      },
      {
         "id": 92,
         "country": "Эквадор"
      },
      {
         "id": 93,
         "country": "Коста-Рика"
      },
      {
         "id": 94,
         "country": "Кипр"
      },
      {
         "id": 95,
         "country": "Уругвай"
      },
      {
         "id": 96,
         "country": "Ирак"
      },
      {
         "id": 97,
         "country": "Мартиника"
      },
      {
         "id": 98,
         "country": "Эстония"
      },
      {
         "id": 99,
         "country": "ОАЭ"
      },
      {
         "id": 100,
         "country": "Бангладеш"
      },
      {
         "id": 101,
         "country": "Македония"
      },
      {
         "id": 102,
         "country": "Гвинея"
      },
      {
         "id": 103,
         "country": "Иордания"
      },
      {
         "id": 104,
         "country": "Латвия"
      },
      {
         "id": 105,
         "country": "Армения"
      },
      {
         "id": 106,
         "country": "Украина"
      },
      {
         "id": 107,
         "country": "Сирия"
      },
      {
         "id": 108,
         "country": "Шри-Ланка"
      },
      {
         "id": 109,
         "country": "Нигерия"
      },
      {
         "id": 110,
         "country": "Берег Слоновой кости"
      },
      {
         "id": 111,
         "country": "Грузия"
      },
      {
         "id": 112,
         "country": "Сенегал"
      },
      {
         "id": 113,
         "country": "Монголия"
      },
      {
         "id": 114,
         "country": "Габон"
      },
      {
         "id": 115,
         "country": "Замбия"
      },
      {
         "id": 116,
         "country": "Албания"
      },
      {
         "id": 117,
         "country": "Камерун"
      },
      {
         "id": 118,
         "country": "Буркина-Фасо"
      },
      {
         "id": 119,
         "country": "Узбекистан"
      },
      {
         "id": 120,
         "country": "Малайзия"
      },
      {
         "id": 121,
         "country": "Сербия"
      },
      {
         "id": 122,
         "country": "Гана"
      },
      {
         "id": 123,
         "country": "Таджикистан"
      },
      {
         "id": 124,
         "country": "Гаити"
      },
      {
         "id": 125,
         "country": "Конго (ДРК)"
      },
      {
         "id": 126,
         "country": "Гватемала"
      },
      {
         "id": 127,
         "country": "Российская империя"
      },
      {
         "id": 128,
         "country": "Беларусь"
      },
      {
         "id": 129,
         "country": "Молдова"
      },
      {
         "id": 130,
         "country": "Азербайджан"
      },
      {
         "id": 131,
         "country": "Палестина"
      },
      {
         "id": 132,
         "country": "Оккупированная Палестинская территория"
      },
      {
         "id": 133,
         "country": "Корея Северная"
      },
      {
         "id": 134,
         "country": "Никарагуа"
      },
      {
         "id": 135,
         "country": "Камбоджа"
      },
      {
         "id": 136,
         "country": "Ангола"
      },
      {
         "id": 137,
         "country": "Сербия и Черногория"
      },
      {
         "id": 138,
         "country": "Непал"
      },
      {
         "id": 139,
         "country": "Бенин"
      },
      {
         "id": 140,
         "country": "Гваделупа"
      },
      {
         "id": 141,
         "country": "Гренландия"
      },
      {
         "id": 142,
         "country": "Гвинея-Бисау"
      },
      {
         "id": 143,
         "country": "Макао"
      },
      {
         "id": 144,
         "country": "Парагвай"
      },
      {
         "id": 145,
         "country": "Мавритания"
      },
      {
         "id": 146,
         "country": "Руанда"
      },
      {
         "id": 147,
         "country": "Фарерские острова"
      },
      {
         "id": 148,
         "country": "Кот-д’Ивуар"
      },
      {
         "id": 149,
         "country": "Гибралтар"
      },
      {
         "id": 150,
         "country": "Ботсвана"
      },
      {
         "id": 151,
         "country": "Боливия"
      },
      {
         "id": 152,
         "country": "Мадагаскар"
      },
      {
         "id": 153,
         "country": "Кабо-Верде"
      },
      {
         "id": 154,
         "country": "Чад"
      },
      {
         "id": 155,
         "country": "Мали"
      },
      {
         "id": 156,
         "country": "Фиджи"
      },
      {
         "id": 157,
         "country": "Бутан"
      },
      {
         "id": 158,
         "country": "Барбадос"
      },
      {
         "id": 159,
         "country": "Тринидад и Тобаго"
      },
      {
         "id": 160,
         "country": "Мозамбик"
      },
      {
         "id": 161,
         "country": "Заир"
      },
      {
         "id": 162,
         "country": "Андорра"
      },
      {
         "id": 163,
         "country": "Туркменистан"
      },
      {
         "id": 164,
         "country": "Гайана"
      },
      {
         "id": 165,
         "country": "Корея"
      },
      {
         "id": 166,
         "country": "Нигер"
      },
      {
         "id": 167,
         "country": "Конго"
      },
      {
         "id": 168,
         "country": "Того"
      },
      {
         "id": 169,
         "country": "Ватикан"
      },
      {
         "id": 170,
         "country": "Черногория"
      },
      {
         "id": 171,
         "country": "Бурунди"
      },
      {
         "id": 172,
         "country": "Папуа - Новая Гвинея"
      },
      {
         "id": 173,
         "country": "Бахрейн"
      },
      {
         "id": 174,
         "country": "Гондурас"
      },
      {
         "id": 175,
         "country": "Судан"
      },
      {
         "id": 176,
         "country": "Эфиопия"
      },
      {
         "id": 177,
         "country": "Йемен"
      },
      {
         "id": 178,
         "country": "Вьетнам Северный"
      },
      {
         "id": 179,
         "country": "Суринам"
      },
      {
         "id": 180,
         "country": "Маврикий"
      },
      {
         "id": 181,
         "country": "Белиз"
      },
      {
         "id": 182,
         "country": "Либерия"
      },
      {
         "id": 183,
         "country": "Лесото"
      },
      {
         "id": 184,
         "country": "Уганда"
      },
      {
         "id": 185,
         "country": "Каймановы острова"
      },
      {
         "id": 186,
         "country": "Антигуа и Барбуда"
      },
      {
         "id": 187,
         "country": "Западная Сахара"
      },
      {
         "id": 188,
         "country": "Сан-Марино"
      },
      {
         "id": 189,
         "country": "Гуам"
      },
      {
         "id": 190,
         "country": "Косово"
      },
      {
         "id": 191,
         "country": "Лаос"
      },
      {
         "id": 192,
         "country": "Катар"
      },
      {
         "id": 193,
         "country": "Оман"
      },
      {
         "id": 194,
         "country": "Американские Виргинские острова"
      },
      {
         "id": 195,
         "country": "Сиам"
      },
      {
         "id": 196,
         "country": "Сьерра-Леоне"
      },
      {
         "id": 197,
         "country": "Эритрея"
      },
      {
         "id": 198,
         "country": "Сомали"
      },
      {
         "id": 199,
         "country": "Доминика"
      },
      {
         "id": 200,
         "country": "Бирма"
      },
      {
         "id": 201,
         "country": "Реюньон"
      },
      {
         "id": 202,
         "country": "Федеративные Штаты Микронезии"
      },
      {
         "id": 203,
         "country": "Самоа"
      },
      {
         "id": 204,
         "country": "Американское Самоа"
      },
      {
         "id": 205,
         "country": "Свазиленд"
      },
      {
         "id": 206,
         "country": "Французская Полинезия"
      },
      {
         "id": 207,
         "country": "Мьянма"
      },
      {
         "id": 208,
         "country": "Новая Каледония"
      },
      {
         "id": 209,
         "country": "Французская Гвиана"
      },
      {
         "id": 210,
         "country": "Сент-Винсент и Гренадины"
      },
      {
         "id": 211,
         "country": "Малави"
      },
      {
         "id": 212,
         "country": "Экваториальная Гвинея"
      },
      {
         "id": 213,
         "country": "Коморы"
      },
      {
         "id": 214,
         "country": "Кирибати"
      },
      {
         "id": 215,
         "country": "Тувалу"
      },
      {
         "id": 216,
         "country": "Тимор-Лесте"
      },
      {
         "id": 217,
         "country": "ЦАР"
      },
      {
         "id": 218,
         "country": "Тонга"
      },
      {
         "id": 219,
         "country": "Гренада"
      },
      {
         "id": 220,
         "country": "Гамбия"
      },
      {
         "id": 221,
         "country": "Антарктида"
      },
      {
         "id": 222,
         "country": "Острова Кука"
      },
      {
         "id": 223,
         "country": "Остров Мэн"
      },
      {
         "id": 224,
         "country": "Внешние малые острова США"
      },
      {
         "id": 225,
         "country": "Монтсеррат"
      },
      {
         "id": 226,
         "country": "Маршалловы острова"
      },
      {
         "id": 227,
         "country": "Бруней-Даруссалам"
      },
      {
         "id": 228,
         "country": "Сейшельские острова"
      },
      {
         "id": 229,
         "country": "Палау"
      },
      {
         "id": 230,
         "country": "Сент-Люсия"
      },
      {
         "id": 231,
         "country": "Вануату"
      },
      {
         "id": 232,
         "country": "Мальдивы"
      },
      {
         "id": 233,
         "country": "Босния"
      },
      {
         "id": 234,
         "country": "Уоллис и Футуна"
      },
      {
         "id": 235,
         "country": "Белоруссия"
      },
      {
         "id": 236,
         "country": "Киргизия"
      },
      {
         "id": 239,
         "country": "Джибути"
      },
      {
         "id": 240,
         "country": "Виргинские Острова (США)"
      },
      {
         "id": 241,
         "country": "Северная Македония"
      },
      {
         "id": 242,
         "country": "Виргинские Острова (Великобритания)"
      },
      {
         "id": 3545269,
         "country": "Сент-Люсия "
      },
      {
         "id": 3781461,
         "country": "Сент-Китс и Невис"
      },
      {
         "id": 3985922,
         "country": "Соломоновы Острова"
      },
      {
         "id": 4336645,
         "country": "Виргинские Острова"
      },
      {
         "id": 7801402,
         "country": "Фолклендские острова"
      },
      {
         "id": 10842163,
         "country": "Остров Святой Елены"
      },
      {
         "id": 32518739,
         "country": "острова Теркс и Кайкос"
      },
      {
         "id": 47738117,
         "country": "Мелкие отдаленные острова США"
      }
   ]
}
