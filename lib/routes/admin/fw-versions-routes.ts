import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class FwVersionsAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/fw-versions')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const fw_versions = await db.sqlRequest(`
                        SELECT * FROM fwversions ${filters};
                    `);
                    for (let i = 0; i < fw_versions.length; i++) {
                        fw_versions[i] = decodeEntity(fw_versions[i]);
                    }
                    logger.info(`fw-versions were sent to admin`);
                    res.status(200).send(fw_versions);
                } catch (error) {
                    logger.error('fw-versions sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const fw_version = createEntity(req.body);
                    await db.sqlRequest(`
                        INSERT INTO fwversions (${ fw_version.fields }) VALUES (${ fw_version.values });
                    `);
                    logger.info(`new fw-version "${req.body.version}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new fw-version creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/fw-versions/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM fwversions WHERE id=${ id };
                    `);
                    const fw_version = decodeEntity(rows[0]);
                    logger.info(`fw-version id:${ id } was sent to admin`);
                    res.status(200).send(fw_version);
                } catch (error) {
                    logger.error(`fw-version id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedFwVersion = updateEntity(req.body);
                    await db.sqlRequest(`
                        UPDATE fwversions SET ${ updatedFwVersion } WHERE id="${ id }";
                    `);
                    logger.info(`fw-version id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update fw-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM fwversions WHERE id="${ id }";
                    `);
                    logger.info(`fw-version id:${ id } deleted`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`delete fw-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
