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
let pages;
let movieDb;

const searchMovieDbProvider  = async (movieName, page) => { 
    try{
            let response = await request
            .get(`${MOVIE_BASE_URI}/search/movie`)
            .query({ api_key: `${API_KEY_MOVIE}` })
            .query({query: movieName})
            .query({page: page})
            .send();
        movies.push(response.body.results);

        if(pages !== response.body.total_pages){
            pages++;
            await searchMovieDbProvider(movieName, pages);
        }
    } catch (error) {
        console.error(error);
    }

    return _.flatten(movies);
}

module.exports = searchMovieDbProvider;