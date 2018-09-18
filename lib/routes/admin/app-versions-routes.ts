import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class AppVersionsAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/app-versions')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const app_versions = await db.sqlRequest(`
                        SELECT * FROM appversions ${filters};
                    `);
                    for (let i = 0; i < app_versions.length; i++) {
                        app_versions[i] = decodeEntity(app_versions[i]);
                    }
                    logger.info(`app-versions were sent to admin`);
                    res.status(200).send(app_versions);
                } catch (error) {
                    logger.error('app-versions sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const app_version = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO appversions (${ app_version.fields }) VALUES (${ app_version.values });
                    `);
                    logger.info(`new app-version "${req.body.query.version}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new app-version creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/app-versions/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM appversions WHERE id=${ id };
                    `);
                    const app_version = decodeEntity(rows[0]);
                    logger.info(`app-version id:${ id } was sent to admin`);
                    res.status(200).send(app_version);
                } catch (error) {
                    logger.error(`app-version id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedAppVersion = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE app-versions SET ${ updatedAppVersion } WHERE id="${ id }";
                    `);
                    logger.info(`appversion id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update app-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM app-versions WHERE id="${ id }";
                    `);
                    logger.info(`appversion id:${ id } deleted`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`delete app-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
