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
}

type listFilms = {
   isTop: boolean;
   name: string;
   title: string;
   getData: ({}: argumentForFilmSearch) => Promise<string | respfilmsWithFilters>;
   argums: {
      filmsType: string;
      genres?: number;
      country?: number;
      yearFrom?: number;
      yearTo?: number;
   };
}
