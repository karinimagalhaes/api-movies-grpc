import client from './src/client/client.js';

client.searchMovie(searchParam, (error, movies) => {
    if(!error){
        console.log('Successfully fetch search movies');
        console.log(movies);
    }
    else{
        console.error(error);
    }
})