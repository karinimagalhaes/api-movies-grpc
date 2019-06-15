// import path from "path";
// import Mali from "mali";
// import searchMovieRequest from "./src/requests/movieRequest.js";

const path = require("path");
const Mali = require("mali");
const searchMovieDbProvider = require("./src/requests-providers/moviedb-provider.js");

const PROTO_PATH = path.resolve(__dirname, "./src/protos/movies.proto");

const searchMovie = async ctx => {
    console.log(ctx.type);
    console.log("Request received.");
    await searchMovieDbProvider(ctx.request.req.movieName, ctx.request.req.page, ctx.call);
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
