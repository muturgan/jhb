import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class AppsAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/apps')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const apps = await db.sqlRequest(`
                        SELECT * FROM apps ${filters};
                    `);
                    for (let i = 0; i < apps.length; i++) {
                        apps[i] = decodeEntity(apps[i]);
                    }
                    logger.info(`apps were sent to admin`);
                    res.status(200).send(apps);
                } catch (error) {
                    logger.error('apps sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const createdApp = createEntity(req.body);
                    await db.sqlRequest(`
                        INSERT INTO apps (${ createdApp.fields }) VALUES (${ createdApp.values });
                    `);
                    logger.info(`new app "${req.body.name}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new app creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/apps/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM apps WHERE id=${ id };
                    `);
                    const decodedApp = decodeEntity(rows[0]);
                    logger.info(`app id:${ id } was sent to admin`);
                    res.status(200).send(decodedApp);
                } catch (error) {
                    logger.error(`app id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedApp = updateEntity(req.body);
                    await db.sqlRequest(`
                        UPDATE apps SET ${ updatedApp } WHERE id="${ id }";
                    `);
                    logger.info(`app id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update app id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM apps WHERE id="${ id }";
                    `);
                    logger.info(`app id:${ id } deleted`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`delete app id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
