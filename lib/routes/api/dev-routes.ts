import { Request, Response } from 'express';
import db from '../../db-controller';
import path = require('path');
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity } from '../support-functions';

export class DevRoutes {    
    
    public routes(app): void {
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send('GET request successful.');
        });

        app.route('/getLogs')
        .get((req: Request, res: Response) => {
            try {
                res.sendFile( path.join(__dirname, '/combined.log') );
                logger.info(`logs were sent to ${ req.ip }`);
            } catch (error) {
                logger.error(`failed to send logs tp ${ req.ip }`, error);
                res.status(500).send('db connection failed...');
            }
        });

        app.route('/testDbConnection')
        .get( async (req: Request, res: Response) => {
            try {
                const rows = await db.sqlRequest(`SELECT * FROM example`);
                res.status(200).send('db connection is fine!');
            } catch (error) {
                res.status(500).send('db connection failed...');
            }
        });

        app.route('/mysqler')
        .post( async (req: Request, res: Response) => {
            try {
                const rows = await db.sqlRequest(req.body.query);
                res.status(200).send({
                    rows: rows,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });

        app.route('/api/news')
            .post( async (req: Request, res: Response) => {
                try {
                    const theNew = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO news (${ theNew.fields }) VALUES (${ theNew.values });
                    `);
                    logger.info(`the new "${req.body.query.login}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new new creation failed', error);
                    res.status(500).send(error);
                }
            }
        );
    }
}