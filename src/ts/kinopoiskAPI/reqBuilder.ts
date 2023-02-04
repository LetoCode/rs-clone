import { DOMAIN, KINOPOISK_URLS, API_KEY } from "./kinopoiskURLs";

export function getRequestOptions(): requestOptions {
   return {
      method: 'GET',
      headers: {
         'X-API-KEY': `${API_KEY}`,
         'Content-Type': 'application/json',
      }
   }
}

export function getRequestURL(
   { APItarget, params = '', id }:
      { APItarget: keyof kinopoiskURLs, params?: string, id?: string })
   : string {
   const endpoint: string = KINOPOISK_URLS[APItarget];
   let newEndpoint: string = endpoint;
   if (id) {
      newEndpoint = endpoint.replace('{id}', id);
   }
   const url = `${DOMAIN}/${newEndpoint}${params}`;
   return url;
}