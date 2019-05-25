import client from './src/client/client.js';

client.movieStar(getDetail(movieId), (error, movie) => {
    if(!error){
        console.log('Movie add successfully', movie);
    }
    else{
        console.error(error);
    }
})