import { DOMAIN, KINOPOISK_URLS, API_KEYS, USED_API_KEYS } from "./kinopoiskURLs";

export function getRequestOptions(useNewApiKey: boolean = false): requestOptions {
   if (!USED_API_KEYS.length) {
      if (API_KEYS.length) {
         const apiKey: string = API_KEYS.pop() as string;
         USED_API_KEYS.push(apiKey);
      }
   }
   if (useNewApiKey) {
      if (API_KEYS.length) {
         const apiKey: string = API_KEYS.pop() as string;
         USED_API_KEYS.push(apiKey);
      }
   }

   // console.log('API_KEYS=', API_KEYS);
   const currentAPIkey = USED_API_KEYS.at(-1);
   console.log('currentAPIkey=', currentAPIkey);
   return {
      method: 'GET',
      headers: {
         'X-API-KEY': `${currentAPIkey}`,
         'Content-Type': 'application/json',
      }
   }
}

export function getRequestURL(
   { APItarget, params = '', id }:
      { APItarget: keyof kinopoiskURLs, params?: string, id?: string }): string {
   const endpoint: string = KINOPOISK_URLS[APItarget];
   let newEndpoint: string = endpoint;
   if (id) {
      newEndpoint = endpoint.replace('{id}', id);
   }
   const url = `${DOMAIN}/${newEndpoint}${params}`;
   return url;
}