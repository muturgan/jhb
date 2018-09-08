import redis = require('redis');
import logger from './logger';
import fs = require('fs');
import mkdirp = require('mkdirp');

const redis_key = 'TEST_JSON';
const folder_json = './JSON_TEST'
const file_json = '/json_from_api';

class Redis {
    private _redisClient: redis.RedisClient;

    constructor() {
        this._redisClient = redis.createClient();

        // --subscribe for event "error"-------
        this._redisClient.on('error', (error) => {
            logger.error('"Error" event in "Redis"', error);
        });
        // --subscribe for event "connection"---
        this._redisClient.on('connect', () => { 
            logger.info('Redis connected.');
        });
        // ----del old keys from redis-------
        this._redisClient.keys("*", (error, keys: Array<string>) => {
            keys.forEach( (key) => {
                if (error) {
                    logger.error(`Cannot delete ${key} key`, error);
                } else {
                    this._redisClient.del(key);
                }
            });
        });
    }

    // -----------Push to Redis on END of queue---------  
    public get pushToRedis() {
        return this._pushToRedis;
    }

    private _pushToRedis(data: any): void {
        this._redisClient.rpush(redis_key, data, (error)  => {
            if (error) {
                this._redisClient.quit();
                logger.error('Cannot set to "Redis"', error);
            }
        });
    }
    // -------------------Pop from Redis --------------------------  
    public get popFromRedis() {
        return this._popFromRedis;
    }
    
    private _popFromRedis(): void {
        this._redisClient.lpop(redis_key, (error, repl) => {
            if (error) {
                logger.error('Cannot get from "Redis"', error);
            } else {
                return repl;
            }
        });
    }
    // -----------------Remove JSON from Redis ----------------------
    public get removeFromRedis() {
        return this._removeFromRedis;
    }
    
    private _removeFromRedis(data: string): void {
        this._redisClient.lrem(redis_key, 0, data , (error) => {
            if (error) {
                logger.error('Cannot deleted send JSON from "Redis": ' + data.slice(0,15), error);
            } else {
                logger.info('DONE: Deleted send JSON from "Redis": ' + data.slice(0,15));
            }
        });
    }
    // ------------------------WriteToFile ------------------------------
    public get writeToFile() {
        return this._writeToFile;
    }
    
    private _writeToFile (str: string): void {
            mkdirp(folder_json, (error) =>  {  // path exists unless there was an error
                let filePath = folder_json + file_json + '(' + new Date().toISOString() + ').txt';
                if (!error) {
                    fs.writeFileSync(filePath, str);
                    logger.info('DONE: Save JSON to file: ' + filePath);
                } else {
                    logger.error('Cannot creat folders to write files', error);
                }
            });
        }
}

export default new Redis;
