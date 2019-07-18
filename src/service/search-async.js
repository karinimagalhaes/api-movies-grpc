const searchMovieDbProvider = require("../requests-providers/moviedb-provider");
const Mali = require("mali");
const Stream = require('stream')
const searchMovieAsync = async (ctx, stream,xx) => {
    console.log(ctx.type);
    console.log("Request sss.");
    ctx.response.res = new Stream.Readable({
        objectMode: true, read(size) {
          return true;
        },
      })
    await searchMovieDbProvider(ctx.request.req.movieName, ctx.request.req.page, ctx.call);
    ctx.response.res.push(null);
    return ctx
};
module.exports = searchMovieAsync;