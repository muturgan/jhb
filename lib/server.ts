import Bluebird = require('bluebird');
global.Promise = Bluebird;

import dotenv = require('dotenv');
dotenv.config();

import server from './app';
import logger from './logger';
import Io from './ws-service';
let io: Io;

const PORT = process.env.PORT;

server.listen(PORT, () => {
    logger.info(`Express server listening on port ${ PORT }`);
    io = new Io(server);
});
