export const NEWS_API_KEY = 'f6b3bf47a54f424392bb2b5058a1ff77';
export const NEWS_DOMAIN = 'http://newsapi.org/v2/top-headlines';

export const NEWS_REQUEST = (): string => {
   const query: URLSearchParams = new URLSearchParams();
   query.set('q', 'кино');
   query.set('language', 'ru');
   query.set('category', 'entertainment');
   query.set('apiKey', NEWS_API_KEY);
   return `${NEWS_DOMAIN}?${query.toString()}`;
}
