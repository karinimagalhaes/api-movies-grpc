import path from "path";
import caller from 'grpc-caller';
import { expect } from 'chai';

let page = 1;

const PROTO_PATH = path.resolve(__dirname, '../protos/movies.proto');

const client = caller('127.0.0.1:5053', PROTO_PATH, 'MovieService');

describe('Testing Movies', async () => {
  it('Shold return all title with search name', async () => {
    const res = await client.searchMovie({ movieName: 'Bob', page: page })
    const movies = [];
    res.on('data', (data) => {
      movies.push(data);
    })

    res.on('end', () => {
      let name = res.movies.filter((titleSearch) => {titleSearch.title.indexOf("Bob")});
      expect(name === -1, "The title does not contain the searched word");
      done();
    });
  });
});