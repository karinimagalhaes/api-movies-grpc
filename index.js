// import path from "path";
// import Mali from "mali";
// import searchMovieRequest from "./src/requests/movieRequest.js";

const path = require("path");
const Mali = require("mali");
const searchMovie = require("./src/service/search-sync");

const PROTO_PATH = path.resolve(__dirname, "./src/protos/movies.proto");

const main = () => {
    const app = new Mali(PROTO_PATH, "MovieService", {
        defaults: true
    });

    app.use({searchMovie});

    app.start("127.0.0.1:5053");

    console.log("Listening...");
};

main();
