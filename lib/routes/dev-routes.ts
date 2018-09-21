import { Request, Response } from 'express';
import db from '../db-controller';
import path = require('path');
import logger from '../logger';
import authService from './auth-service';
import { attackerDetails } from './support-functions';

export class DevRoutes {

    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send('The server works fine...');
        });

        app.route('/api/dev/getLogs')
        .get( async (req: Request, res: Response) => {
            try {
                const validity = await authService.verifyToken(req, true);

                    if (validity) {
                        if (!validity.authorized) {
                            logger.error(`unauthorized user tried to get logs`, attackerDetails(req));
                            res.sendStatus(401);
                        } else {
                            if (validity.permissions !== 8) {
                                logger.error(`user with low permissions tried to get logs`, attackerDetails(req));
                                res.sendStatus(403);
                            } else {
                                res.sendFile( path.join(process.cwd(), '/combined.log') );
                                logger.info(`logs were sent to ${ req.ip }`);
                            }
                        }
                    } else {
                        logger.error(`failed to send logs to ${ req.ip }`, {validity});
                        res.status(500).send({validity});
                    }
            } catch (error) {
                logger.error(`failed to send logs to ${ req.ip }`, error);
                res.status(500).send('logs sending failed...');
            }
        });

        app.route('/api/dev/testDbConnection')
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

        app.route('/api/dev/mysqler')
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
