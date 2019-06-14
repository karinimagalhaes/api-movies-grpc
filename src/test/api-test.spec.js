const path = require("path");
const caller = require('grpc-caller');
const PROTO_PATH = path.resolve(__dirname, '../protos/movies.proto');

const client = caller('127.0.0.1:5053', PROTO_PATH, 'MovieService');

describe('Teste', async () => {
  it('teste 2', async () => {
    const res = await client.searchMovie({ searchParam: 'Bob', page: 1 })
    console.log(res)
  })
})