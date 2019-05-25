import client from './src/client/client.js';
import mongoose from 'mongoose';

const bdConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb');
}

client.movieStar(getDetail(movieId), (error, movie) => {
    if(!error){
        console.log('Movie add successfully', movie);
    }
    else{
        console.error(error);
    }
})