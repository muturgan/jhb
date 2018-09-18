import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, decodeEntity, setFilters } from '../support-functions';

export class FwVersionsApiRoutes {

    public routes(app): void {

        app.route('/api/fw-versions')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const versions = await db.sqlRequest(`
                        SELECT * FROM fwversions ${filters};
                    `);
                    for (let i = 0; i < versions.length; i++) {
                        versions[i] = decodeEntity(versions[i]);
                    }
                    logger.info(`fw-versions were sent to user`);
                    res.status(200).send(versions);
                } catch (error) {
                    logger.error('fw-versions sending to user failed', error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/fw-versions/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM fwversions WHERE id=${ id };
                    `);
                    const theNew = decodeEntity(rows[0]);
                    logger.info(`version id:${ id } was sent to user`);
                    res.status(200).send(theNew);
                } catch (error) {
                    logger.error(`version id:${ getIdFromUrl(req.originalUrl) } sending to user failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/fw-versions/update')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const versions = await db.sqlRequest(`
                        SELECT * FROM fwversions ${filters};
                    `);
                    for (let i = 0; i < versions.length; i++) {
                        versions[i] = decodeEntity(versions[i]);
                    }
                    logger.info(`versions were sent to user`);
                    res.status(200).send(versions);
                } catch (error) {
                    logger.error('versions sending to user failed', error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/fw-versions/update/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM fwversions WHERE id=${ id };
                    `);
                    const version = decodeEntity(rows[0]);
                    logger.info(`version id:${ id } was sent to user`);
                    res.status(200).send(version);
                } catch (error) {
                    logger.error(`version id:${ getIdFromUrl(req.originalUrl) } sending to user failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
