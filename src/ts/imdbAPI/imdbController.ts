import { getFromAPI } from "../kinopoiskAPI/loader";
import { IMDB_DOMAIN } from "./imdbURLs";


export async function getFilmImdb(title: string,): Promise<respImdbTitle | string> {
   const requestURL: string = IMDB_DOMAIN(title);
   console.log('requestURL=', requestURL);
   const data = await getFromAPI<respImdbTitle>(requestURL, { method: 'GET' });
   return data;
}