interface respImdbTitle {
   Title: string,
   Year: string,
   Rated: string,
   Released: string,
   Runtime: string,
   Genre: string,
   Director: string,
   Writer: string,
   Actors: string,
   Plot: string,
   Language: string,
   Country: string,
   Awards: string,
   Poster: string,
   Ratings: imdbRatingItem[],
   Metascore: string,
   imdbRating: string,
   imdbVotes: string,
   imdbID: string,
   Type: string,
   DVD: string,
   BoxOffice: string,
   Production: string,
   Website: string,
   Response: string
}

interface imdbRatingItem {
   Source: string,
   Value: string
}