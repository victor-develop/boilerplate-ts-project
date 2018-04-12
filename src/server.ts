import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as HttpStatus from 'http-status-codes';
import { standardMessage } from './standard-message';
import * as path from 'path';

export type Port = string | number;

export interface IServer {
  port: Port;
  app: Express.Application;
}

const logger = console;

export const staticDir = path.join('dist','public');

export const startServer: (port: Port) => IServer = (port) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(express.static(staticDir));

  /**
   * add your own logic here
   * 
   * app.use(MY_EXPRESS_ROUTER);
   */

  app.use((req, res) => {
    res.status(HttpStatus.NOT_FOUND).json({ message: 'Resource Not Found.' });
  });

  // handle other errors emerged
  app.use((err, req, res, next) => {
    logger.log(err.message);
    logger.log(err);

    if (err.statusCode && /4\d+/.test(err.statusCode)){
      res.status(err.statusCode)
      .json({ message: err.message });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(standardMessage(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  });

  app.listen(port);
  const server: IServer = {
    port,
    app,
  };
  return server;
};
