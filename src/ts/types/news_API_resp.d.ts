interface respNews {
   status: string,
   totalResults: string;
   articles: newsArticle[];
}


interface newsArticle {
   author: string;
   content: string;
   description: string;
   publishedAt: string;
   title: string;
   url: string;
   urlToImage: string;
   source: { id: string; name: string };
}