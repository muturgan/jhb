import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class FwsAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/fws')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const fws = await db.sqlRequest(`
                        SELECT * FROM fws ${filters};
                    `);
                    for (let i = 0; i < fws.length; i++) {
                        fws[i] = decodeEntity(fws[i]);
                    }
                    logger.info(`fws were sent to admin`);
                    res.status(200).send(fws);
                } catch (error) {
                    logger.error('fws sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const fw = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO fws (${ fw.fields }) VALUES (${ fw.values });
                    `);
                    logger.info(`new fw "${req.body.query.name}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new fw creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/fws/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM fws WHERE id=${ id };
                    `);
                    const fw = decodeEntity(rows[0]);
                    logger.info(`fw id:${ id } was sent to admin`);
                    res.status(200).send(fw);
                } catch (error) {
                    logger.error(`fw id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedFw = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE fws SET ${ updatedFw } WHERE id="${ id }";
                    `);
                    logger.info(`fw id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update fw id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM fws WHERE id="${ id }";
                    `);
                    logger.info(`fw id:${ id } deleted`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`delete fw id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
