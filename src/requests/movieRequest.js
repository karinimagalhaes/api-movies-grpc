const request = require('superagent');
var _ = require('lodash');
require('dotenv/config');

let movies = [];
let pages;

const searchMovieRequest  = async (searchParam, page) => { 
    try{
        let response = await request
            .get(`https://api.themoviedb.org/3/search/movie`)
            .query({api_key: `0a6450abe5fcd11ae1745add7e70e34d`})
            .query({query: searchParam})
            .query({page: page})
            .send();

        movies.push(response.body.results);

        if(pages !== response.body.total_pages){
            pages++;
            await searchMovieRequest(searchParam, pages);
        }
    } catch (error){
        console.log("Search Movies error: " + error);
    }

    return _.flatten(movies);
}


module.exports = searchMovieRequest;