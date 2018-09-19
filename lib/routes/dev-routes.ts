import { Request, Response } from 'express';
import db from '../db-controller';
import path = require('path');
import logger from '../logger';

export class DevRoutes {

    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send('The server works fine...');
        });

        app.route('/getLogs')
        .get((req: Request, res: Response) => {
            try {
                res.sendFile( path.join(process.cwd(), '/combined.log') );
                logger.info(`logs were sent to ${ req.ip }`);
            } catch (error) {
                logger.error(`failed to send logs tp ${ req.ip }`, error);
                res.status(500).send('logs sending failed...');
            }
        });

        app.route('/testDbConnection')
        .get( async (req: Request, res: Response) => {
            try {
                await db.sqlRequest(`SELECT * FROM users`);
                res.status(200).send('db connection is fine!');
            } catch (error) {
                console.error('test db connection error:');
                console.error(error);
                res.status(500).send('db connection failed...');
            }
        });

        app.route('/mysqler')
        .post( async (req: Request, res: Response) => {
            try {
                const rows = await db.sqlRequest(req.body.query);
                res.status(200).send({rows});
            } catch (error) {
                console.error('');
                console.error('mysqler error:');
                console.error(error);
                res.status(500).send(error);
            }
        });
    }
}
