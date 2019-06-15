// import request from 'superagent';
// import * as _ from 'lodash';
// import dotenv from 'dotenv';

const request = require('superagent');
var _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const { MOVIE_OMDB_URI } = process.env;
const { API_KEY_OMDB } = process.env;

let movies = [];
let pages;

const searchOmdbProvider  = async (movieName, page) => { 

    let response = await request
        .get(`${MOVIE_OMDB_URI}/`)
        .query({ api_key: `${API_KEY_OMDB}` })
        .query({query: movieName})
        .query({page: page})
        .send();

    movies.push(response.body.results);

    if(pages !== response.body.total_pages){
        pages++;
        await searchOmdbProvider(searchParam, pages);
    }
    return _.flatten(movies);
}

module.exports = searchOmdbProvider;