const searchMovieDbProvider = require("../requests-providers/moviedb-provider");

const searchMovie = async ctx => {

    console.log("Request received.");
    console.log("page: " + ctx.request.req.page);
    let listMovies = await searchMovieDbProvider(ctx.request.req.movieName, ctx.request.req.page);
    let movies = [];

    for (let index = 0; index < listMovies.length; index++) {
        movies.push({
            vote_count: listMovies[index].vote_count,
            vote_average: listMovies[index].vote_average,
            title: listMovies[index].title,
            popularity: listMovies[index].popularity,
            original_language: listMovies[index].original_language,
            original_title: listMovies[index].original_title,
            overview: listMovies[index].overview,
            release_date: listMovies[index].release_date,
            id: listMovies[index].id
        });
        
    };
    ctx.res = { movies };
};

module.exports = searchMovie;