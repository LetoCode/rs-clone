export function setQueryParamsForLists(key: string, value: string): void {
   const href = window.location.href;
   const firstURL = href.split('?')[0];
   const search = window.location.search;
   let params: URLSearchParams;
   let url: string;

   if (search) {
      params = new URLSearchParams(search);
   } else {
      params = new URLSearchParams();
   }

   if (key && value) {
      params.set(key, value);
   } else {
      params.delete(key);
   }

   if (params.toString().length === 0) {
      url = firstURL;
   } else {
      url = `${firstURL}?${params}`;
   }

   window.history.pushState({}, '', url);
}
