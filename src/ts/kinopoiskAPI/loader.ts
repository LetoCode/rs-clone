import { API_KEYS } from "./kinopoiskURLs";
import { getRequestOptions } from "./reqBuilder";

export async function getFromAPI<T>(url: string, requestOptions: requestOptions): Promise<T | string> {
   // console.log('requestOptions=', requestOptions)
   let data = '';
   try {
      const res: Response = await fetch(url, requestOptions);
      if (res.ok) {
         const resStatus: number = res.status;
         if (resStatus !== 200) {
            sendErrorMessage(resStatus);
         } else {
            data = await res.json();
            return data;
         }
      }
   } catch (e: unknown) {
      if (e instanceof Error) {
         if (e.message === 'Failed to fetch' && API_KEYS.length) {
            //if Error then try to change API key
            new Promise((res, rej) => {
               console.log('1111111')
               const requestOptions: requestOptions = getRequestOptions(true);
               res(requestOptions);
            })
               .then((reqOpts) => getFromAPI<T>(url, reqOpts as requestOptions));
         } else {
            console.error(`#Error: ${e.name}, #Message: ${e.message}`);
         }
      } else {
         console.error(`#Unknown error: ${e}`);
      }
   }
   return data;
}

function sendErrorMessage(resStatus: number) {
   if (resStatus === 401) {
      console.error('##Пустой или неправильный токен!');
   }
   if (resStatus === 402) {
      console.error('##Превышен лимит запросов(или дневной, или общий)!');
   }
   if (resStatus === 429) {
      console.error('##Слишком много запросов. Лимит 5 запросов в секунду!');
   }
   if (String(resStatus).startsWith('5')) {
      console.error('##Ответ сервера: ошибка 5xx!');
   }
}

