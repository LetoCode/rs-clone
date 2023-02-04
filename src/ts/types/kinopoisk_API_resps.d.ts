interface allKinopoiskAPIs {
   name: string,
   cb: Function,
}

//General
interface respCountry {
   country: string
}

interface respGenre {
   genre: string
}

interface respCompanies {
   name: string
}

interface respFilmItem {
   kinopoiskId: number,
   nameRu: string,
   nameEn: string,
   year: number,
   poserUrl: string,
   posterUrlPreview: string,
   countries: respCountry[],
   duration: number,
   premiereRu: string,
   genre: respGenre[]
}


//Premeires
interface respPremieres {
   total: number,
   items: respFilmItem[]
}

//Film
interface respFilm {
   kinopoiskId: number,
   imdbId: string,
   nameRu: string,
   nameEn: string,
   nameOriginal: string,
   posterUrl: string,
   posterUrlPreview: string,
   coverUrl: string,
   logoUrl: string,
   reviewsCount: number,
   ratingGoodReview: number,
   ratingGoodReviewVoteCount: number,
   ratingKinopoisk: number,
   ratingKinopoiskVoteCount: number,
   ratingImdb: number,
   ratingImdbVoteCount: number,
   ratingFilmCritics: number,
   ratingFilmCriticsVoteCount: number,
   ratingAwait: number,
   ratingAwaitCount: number,
   ratingRfCritics: number,
   ratingRfCriticsVoteCount: number,
   webUrl: string,
   year: number,
   filmLength: number,
   slogan: string,
   description: string,
   shortDescription: string,
   editorAnnotation: string,
   isTicketsAvailable: boolean,
   productionStatus: string,
   type: string,
   ratingMpaa: string,
   ratingAgeLimits: string,
   hasImax: boolean,
   has3D: boolean,
   lastSync: string
   countries: respCountry[],
   genres: respGenre[],
   startYear: number,
   endYear: number,
   serial: boolean,
   shortFilm: boolean,
   completed: boolean
}


//Seasons
interface respSeasons {
   total: number,
   items: respSeasonItem[]
}

interface respSeasonItem {
   number: number,
   episodes: respEpisode[],
}

interface respEpisode {
   seasonNumber: number,
   episodeNumber: number,
   nameRu: string,
   nameEn: string,
   synopsis: string,
   releaseDate: string
}


//Facts
interface respFacts {
   total: number,
   items: respFactsItem[]
}

interface respFactsItem {
   text: string,
   type: string,
   spoiler: boolean
}

//Distributions
interface respDistributions {
   total: number,
   items: respDistributionsItem[]
}

interface respDistributionsItem {
   type: string,
   subType: string,
   date: string,
   reRelease: boolean,
   country: respCountry[],
   companies: respCompanies[],
}


//Box office
interface respBoxOffice {
   total: number,
   items: respBoxOfficeItem[]
}

interface respBoxOfficeItem {
   type: string,
   amount: number,
   currencyCode: string,
   name: boolean,
   symbol: string[],
}



//Awards
interface respAwards {
   total: number,
   items: respBoxOfficeItem[]
}

interface respAwardItem {
   name: string,
   win: boolean,
   imageUrl: string,
   nominationName: string,
   year: number,
   persons: respPerson[]
}

interface respPerson {
   kinopoiskId: number,
   webUrl: string,
   nameRu: string,
   nameEn: string,
   sex: string,
   posterUrl: string,
   growth: number,
   birthday: string,
   death: string,
   age: null,
   birthplace: string,
   deathplace: string,
   profession: string,

}

//Top
interface respTop {
   pagesCount: number,
   films: respFilmItem[]
}



//Videos 
interface respVideos {
   total: number,
   items: respVideoItem[]
}

interface respVideoItem {
   url: string,
   name: string,
   site: string
}


//Similars 
interface respSimilars {
   total: number,
   items: respVideoItem[]
}

//Images 
interface respImages {
   total: number,
   totalPages: number,
   items: respVideoItem[]
}

type filmImagesTypes =
   STILL |
   SHOOTING |
   POSTER |
   FAN_ART |
   PROMO |
   CONCEPT |
   WALLPAPER |
   COVER |
   SCREENSHOT;

//Reviews
interface respReviews {
   total: number,
   totalPages: number,
   totalPositiveReviews: number,
   totalNegativeReviews: number,
   totalNeutralReviews: number,
   items: respVideoItem[],
}


type reviewsSortTypes =
   DATE_ASC |
   DATE_DESC |
   USER_POSITIVE_RATING_ASC |
   USER_POSITIVE_RATING_DESC |
   USER_NEGATIVE_RATING_ASC |
   USER_NEGATIVE_RATING_DESC;


//Filters
interface respFilters {
   genres: respGenre[],
   countries: respCountry[]
}

//Films with filters
interface respfilmsWithFilters {

}

interface argumentForFilmSearch {
   country?: number,
   genres?: number,
   filmsOrder?: filmsOrder,
   filmsType?: filmsType,
   ratingFrom?: number,
   ratingTo?: number,
   yearFrom?: number,
   yearTo?: number,
   imdbId?: number,
   keyword?: string,
   page: number
}

type filmsOrder = RATING | NUM_VOTE | YEAR;

type filmsType = FILM | TV_SHOW | TV_SERIES | MINI_SERIES | ALL;


//Sequels_and_prequels
interface SequelAndPrequel {
   filmId: number,
   nameRu: string,
   nameEn: string,
   nameOriginal: string,
   posterUrl: string,
   posterUrlPreview: string,
   relationType: string,
}


//Search by keyword
interface FilmsByKeyWord {
   keyword: string,
   pagesCount: number,
   searchFilmsCountResult: number,
   films: respFilmItem[]
}


//Film staff
interface FilmStaffItem {
   staffId: number,
   nameRu: string,
   nameEn: string,
   description: string,
   posterUrl: string,
   professionText: string,
   professionKey: string,
}


//Person by ID
interface PersonByID {
   personId: number,
   webUrl: string,
   nameRu: string,
   nameEn: string,
   sex: string,
   posterUrl: string,
   growth: string,
   birthday: string,
   death: string,
   age: number,
   birthplace: string,
   deathplace: string,
   hasAwards: number,
   profession: string,
   facts: string[],
   spouses: string[],
   films: respFilmItem[]
}


//Persons by Name
interface PersonsByName {
   total: number,
   items: string[],
}




