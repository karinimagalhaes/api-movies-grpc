const path = require("path");
const Mali = require("mali");
const searchMovieRequest = require("./src/requests/movieRequest.js");

const PROTO_PATH = path.resolve(__dirname, "./src/protos/movies.proto");


const searchMovie = async ctx => {

    console.log("Request received.");
    let listMovies = await searchMovieRequest(ctx.request.req.searchParam, ctx.request.req.page);
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

const main = () => {
    const app = new Mali(PROTO_PATH, "MovieService", {
        defaults: true
    });

    app.use({searchMovie});

    app.start("127.0.0.1:5053");

    console.log("Listening...");
};

main();