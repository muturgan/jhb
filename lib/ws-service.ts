import socketIO = require('socket.io');
import server from './app';
import logger from './logger';

class Io {
    private _io: socketIO.Server;

    constructor() {
        this._io = socketIO(server, {
            transports: ['websocket'],
        });

        this._io.on('connection', (socket: socketIO.Socket) => {
            logger.info(`connected to socket ${socket.id}`);

            socket.on('error', (error) => {
                logger.error('Web socket errorr', error);
            });

            socket.on('testing event', (testingString: string) => {
                try {
                    logger.info(`testing string: ${testingString}`);
                    socket.emit('testing success');
                } catch (error) {
                    logger.error('Web socket errorr', error);
                    socket.emit('testing fail');
                }
            });
        });
    }

    public emitTestingEvent(event: string) {
        this._io.emit(event);
    }

}

export default new Io;