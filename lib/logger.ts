import winston = require('winston');
import { TransformableInfo } from 'logform';

class Logget {
    private _logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf( (info: TransformableInfo) => `
    ${info.timestamp} [${info.level}]: ${info.message}`),
        ),

        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'combined.log' }),
        ],
    });

    private _info(log: string): void {
        this._logger.info(log);
    }

    public get info() {
        return this._info;
    }

    private _error(label: string, error?: {[key: string]: any}): void {
        let errorString = label + '. ';
        if (error) {
            for (const key in error) {
                errorString += `${key}: ${error[key]}; `;
            }
        }
        this._logger.error(errorString);
    }

    public get error() {
        return this._error;
    }
}

const logger = new Logget();
export default logger;
