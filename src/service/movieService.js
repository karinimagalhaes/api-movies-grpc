import request from 'superagent';

let movies = [];

const searchMovies  = async (searchParam, page) => { 
    try{
        let response = await request
            .get(`${MOVIE_BASE_URI}/search/movie`)
            .query({api_key: `${API_KEY}`})
            .query({query: searchParam})
            .query({page: page})
            .send();
        movies.push(response.body);
    if(response.body.total_pages-1 !== 0)
        requestSearch(searchParam, response.body.total_pages-1);
    } catch (error){
        console.log("Search Movies error: " + error);
    }
    return movies;
}

const getDetails = (movieId) => {
    try{
        let response = await request
            .get(`${MOVIE_BASE_URI}/movie/${movieId}`)
            .query({api_key: `${API_KEY}`})
            .send();
        return response.body;
    } catch (error){
        console.log("GetDetails error: " + error);
    }
}

module.exports = searchMovies, getDetails;