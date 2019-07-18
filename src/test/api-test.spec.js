import path from "path";
import caller from 'grpc-caller';
import { expect } from 'chai';

let page = 1;

const PROTO_PATH = path.resolve(__dirname, '../protos/movies.proto');

const client = caller('127.0.0.1:5053', PROTO_PATH, 'MovieService');

describe('Testing Movies', async () => {
  it('Shold return all title with search name sync mode', async () => {
    const res = await client.searchMovie({ movieName: '007', page: page })
    let name = res.movies.filter((titleSearch) => {titleSearch.title.indexOf("'Operation Kid Brother'")});
    expect(name === -1, "The title does not contain the searched word")
  });

  it('Shold return all title with search name async mode', async () => {
    const res = await client.searchMovieAsync({ movieName: '007', page: page })
    let movies = [];
    await new Promise((resolve, reject) => { 
      res.on('data', (data) => {
        if(Array.isArray(data.movies)){
          data.movies.forEach(el => {
            movies.push(el);
          })
        }
      })
  
      res.on('end', () => {
        let name = movies.filter((titleSearch) => {titleSearch.title.indexOf('Operation Kid Brother')});
        expect(name !== -1, "The title contains the searched word");
        resolve()
      });

      res.on('error', () => {
        reject()
      });
    });
    })
});