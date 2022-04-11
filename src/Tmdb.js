const API_KEY = "0df647c67bfa4cada4da707178be2d34";
const API_BASE = "https://api.rawg.io/api/";

/*
  - originais da netflix       ->     games?key=${API_KEY}&dates=${Tresmeses},${Hoje}&ordering=-rating
  - recomendados (trending)    ->     games?key=${API_KEY}&dates=${Hoje},${nextYear}&ordering=-added     
  - em alta (top rated)        ->     games?key=${API_KEY}&ordering=-added
*/
let Hoje,
  Tresmeses,
  genero,
  nextYear = "";

const InitializeDate = () => {
    // Pega data de hoje
    Hoje = new Date().toISOString().slice(0, 10);
  
    // Calcula três meses atrás, (Jogos Recentes)
    let arrHoje = Hoje.split(/[--]/);
    let menosTresMeses = parseInt(arrHoje[1]) - 3;
  
    if (parseInt(arrHoje[2]) > 28) arrHoje[2] = parseInt(arrHoje[2]) - 3;
    if (menosTresMeses.toString().length === 1)
      menosTresMeses = `0${menosTresMeses}`;
  
    arrHoje[1] = menosTresMeses;
    Tresmeses = arrHoje.join("-");
  
    // Calcula + Doze Meses (Proximos Jogos) 
    arrHoje = Hoje.split(/[--]/);
    if (parseInt(arrHoje[2]) > 28) arrHoje[2] = parseInt(arrHoje[2]) - 3;
    const MaisUmAno = parseInt(arrHoje[0]) + 1;
    arrHoje[0] = MaisUmAno;
    nextYear = arrHoje.join("-");
  };

  InitializeDate();

    const basicFetch = async(endpoint) => {
            const req = await fetch(`${API_BASE}${endpoint}`);
        const json = await req.json();
        return json;
    }

export default {
    getHomeList: async() => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`games?key=${API_KEY}&dates=${Tresmeses},${Hoje}&ordering=-rating`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`games?key=${API_KEY}&dates=${Hoje},${nextYear}&ordering=-added`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`games?key=${API_KEY}&ordering=-added`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`games?key=${API_KEY}genres=action`)
            },            
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`games?key=${API_KEY}&genres=puzzle`)
            },            
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`games?key=${API_KEY}&genres=indie`)
            },            
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`games?key=${API_KEY}&genres=adventure`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`games?key=${API_KEY}&genres=card`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId){
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}