import socketIO = require('socket.io');
import logger from './logger';
import dotenv = require('dotenv');
dotenv.config();

export default class Io {
    private _io: socketIO.Server;

    constructor(server) {
        // this._io = socketIO(server, {path: '/api/ws'});
        this._io = socketIO(server, {transports: ['websocket']});

        this._io.on('connection', (socket: socketIO.Socket) => {
            logger.info(`connected to socket ${socket.id}`);

            const interval = setInterval(() => {
                socket.emit('pinguin', 'Dmitry Guselnikov is a man');
            }, 4000);

            socket.on('error', (error) => {
                logger.error('Web socket errorr', error);
            });

            socket.on('error', (error) => {
                logger.error('Web socket errorr', error);
            });

            socket.on('testing event', (data: {message: any}) => {
                logger.info(`testing string from socket: ${ data.message }`);
                socket.emit('testing success', {overheared: data.message, reaction: 'fuck yeah!'});
            });

            socket.on('disconnect', () => {
                clearInterval(interval);
            });
        });
    }

    public emitTestingEvent(event: string) {
        this._io.emit(event);
    }

}
