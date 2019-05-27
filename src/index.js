import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import flightsProto from './src/proto/flights.proto';
import moviesProto from './src/proto/movies.proto';
import skyscannerRequest from './src/service/skyscanner-request.js';
import searchMoviesService from './src/service/movieService.js';

// const packageDefinition = protoLoader.loadSync(flightsProto);
const packageDefinition = protoLoader.loadSync(moviesProto);
const packageObject = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// server.addService(packageObject.FlightService.service, {
//     listPlaces: (call, callback) => {
//         callback(null, skyscannerRequest.getPlaceListService(call.request));
//     }
// })

server.addService(packageObject.MovieService.service, {
    serachMovies: (call, callback) => {
        callback(null, searchMoviesService.serachMovies(call.request));
    }
});