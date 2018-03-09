import { startServer } from './server';

const defaultPort = 8080;
const port = process.env.PORT || defaultPort;
const server = startServer(port);
const logger = console;
logger.log('listening at port:' + port);
