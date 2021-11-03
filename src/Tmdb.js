const API_KEY = "0d40a8a4b8c4a481901871fc12450c8c";
const API_BASE = "https://api.themoviedb.org/3";

/*
  - originais da netflix
  - recomendados (trending)
  - em alta (top rated)
  - ação
  - comédia
  - terror
  - romance
  - documentários
*/

export default {
    getHomeList: async() => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: []
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: []
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: []
            },
            {
                slug: 'action',
                title: 'Ação',
                items: []
            },            {
                slug: 'comedy',
                title: 'Comédia',
                items: []
            },            {
                slug: 'horror',
                title: 'Terror',
                items: []
            },            {
                slug: 'romance',
                title: 'Romance',
                items: []
            },            {
                slug: 'documentary',
                title: 'Documentários',
                items: []
            },
        ]
    }
}