const request = require('superagent');
var _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const { MOVIE_BASE_URI } = process.env;
const { API_KEY_MOVIE } = process.env;

let movies = [];
let pages = 1;
let movieDb;

const searchMovieDbProvider = async (movieName, page, stream) => { 

    let response = await request
        .get(`${MOVIE_BASE_URI}/search/movie`)
        .query({ api_key: `${API_KEY_MOVIE}` })
        .query({query: movieName})
        .query({page: page})
        .send();
    const listMovies = response.body.results;
    const movies = [];
    for (let index = 0; index < listMovies.length; index++) {
        const movie = {
            vote_count: listMovies[index].vote_count,
            vote_average: listMovies[index].vote_average,
            title: listMovies[index].title,
            popularity: listMovies[index].popularity,
            original_language: listMovies[index].original_language,
            original_title: listMovies[index].original_title,
            overview: listMovies[index].overview,
            release_date: listMovies[index].release_date,
            id: listMovies[index].id
        };
        movies.push(movie);
        
    }

    stream.write({ movies });
    console.log("total pages: " + response.body.total_pages, "pages: " + pages)
    if(pages !== response.body.total_pages){
        pages++;
        await searchMovieDbProvider(movieName, pages, stream);
    }

    return _.flatten(movies);
}

module.exports = searchMovieDbProvider;