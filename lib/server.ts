import Bluebird = require('bluebird');
global.Promise = Bluebird;

import dotenv = require('dotenv');
dotenv.config();

import server from './app';
import logger from './logger';

const PORT = process.env.PORT;

server.listen(PORT, () => {
    logger.info(`Express server listening on port ${ PORT }`);
});
