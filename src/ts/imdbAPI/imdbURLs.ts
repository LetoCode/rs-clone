
export const IMDB_API_KEY = '8a44c7bc';
export const IMDB_DOMAIN = (searchWord: string, year = ''): string => {
   if (year) {
      //for develop
      // return `http://www.omdbapi.com/?t=${searchWord}&y=${year}&apikey=${IMDB_API_KEY}&`
      //for deploy
      return `/omdbapi/?t=${searchWord}&y=${year}&apikey=${IMDB_API_KEY}&`
   }
   //for develop
   // return `http://www.omdbapi.com/?t=${searchWord}&apikey=${IMDB_API_KEY}&`
   //for deploy
   return `/omdbapi/?t=${searchWord}&apikey=${IMDB_API_KEY}&`
};

