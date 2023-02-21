interface professionTranslate {
   actor: string;
   director: string;
   writer: string;
   producer: string;
   editor: string;
   operator: string;
   design: string;
}

type listTOP = {
   isTop: boolean;
   name: string;
   title: string;
   getData: (page?: number) => Promise<string | respTop>;
   amount?: number;
}

type listFilms = {
   isTop: boolean
   name: string;
   title: string;
   getData: ({}: argumentForFilmSearch) => Promise<string | respfilmsWithFilters>;
   argums: argumentForFilmSearch;
   amount?: number;
}

type dataset<T> = {
   [item]: T;
}
