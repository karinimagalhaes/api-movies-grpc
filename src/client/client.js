import grpc from 'grpc';

const PROTO_PATH = './src/proto/movies.proto';
const packageDefinition = protoLoader.loadSync(moviesProto);
const packageObject = grpc.loadPackageDefinition(packageDefinition).MovieService;

const client = new MovieService('localhost:50051',
    grpc.credentials.createInsecure());

module.exports = client;