import * as supertest from 'supertest';
import { startServer } from '../server';
import * as HttpStatus from 'http-status-codes';

const defaultPort = 8080;
const port = process.env.PORT || defaultPort;
const server = startServer(port);
const agent = supertest.agent(`http://localhost:${port}`);

const nonExistentRoute = '/non-existent-route';
describe(`get ${nonExistentRoute}`, () => {
  it('return bad request', (done) => {
    agent
    .get(`${nonExistentRoute}`)
    .send()
    .expect(HttpStatus.BAD_REQUEST)
    .end((err,res) => {
      done(err);
    });
  });
});
