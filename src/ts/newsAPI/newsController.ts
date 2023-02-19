import { getFromAPI } from "../kinopoiskAPI/loader";
import { NEWS_REQUEST } from "./newsURLs";


export async function getNews(): Promise<respNews | string> {
   const requestParams = {
      method: 'GET'
   }
   const requestURL: string = NEWS_REQUEST();
   const data = await getFromAPI<respNews>(requestURL, requestParams);
   return data;
}