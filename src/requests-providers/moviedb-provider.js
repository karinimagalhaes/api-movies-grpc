// import request from 'superagent';
// import * as _ from 'lodash';
// import dotenv from 'dotenv';

const request = require('superagent');
var _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const { MOVIE_BASE_URI } = process.env;
const { API_KEY_MOVIE } = process.env;

let movies = [];
let pages = 1;
let movieDb;

const parser = (listMovies) => {
    if(!Array.isArray(listMovies)){
        return [];
    }
    let movies = [];
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
    return movies;
} 
const searchMovieDbProvider = async (movieName, page, stream) => { 
    console.log("page req: " + page)
    try{
            let response = await request
            .get(`${MOVIE_BASE_URI}/search/movie`)
            .query({ api_key: `${API_KEY_MOVIE}` })
            .query({query: movieName})
            .query({page: page})
            .send();
        movies.push(response.body.results);
        if(stream && response.body.results){
            stream.write({
                movies: parser(response.body.results)
            })
        }
        console.log("total pages: " + response.body.total_pages, "pages: " + pages)
        if(pages !== response.body.total_pages){
            pages++;
            await searchMovieDbProvider(movieName, pages, stream);
        }
    } catch (error) {
        console.error('errr',error)
    }
    return _.flatten(movies);
}

module.exports = searchMovieDbProvider;