import { getFromAPI } from "../kinopoiskAPI/loader";
import { IMDB_DOMAIN } from "./amdbURLs";


export async function getFilmImdb(title: string,): Promise<respImdbTitle | string> {
   const requestURL: string = IMDB_DOMAIN(title);
   const data = await getFromAPI<respImdbTitle>(requestURL, { method: 'GET' });
   return data;
}