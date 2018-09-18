import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class NewsAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/news')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const news = await db.sqlRequest(`
                        SELECT * FROM news ${filters};
                    `);
                    for (let i = 0; i < news.length; i++) {
                        news[i] = decodeEntity(news[i]);
                    }
                    logger.info(`news were sent to admin`);
                    res.status(200).send(news);
                } catch (error) {
                    logger.error('news sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const theNew = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO news (${ theNew.fields }) VALUES (${ theNew.values });
                    `);
                    logger.info(`the new "${req.body.query.title}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new new creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/news/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM news WHERE id=${ id };
                    `);
                    const theNew = decodeEntity(rows[0]);
                    logger.info(`the new id:${ id } was sent to admin`);
                    res.status(200).send(theNew);
                } catch (error) {
                    logger.error(`the new id:${ getIdFromUrl(req.originalUrl) } sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedNew = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE news SET ${ updatedNew } WHERE id="${ id }";
                    `);
                    logger.info(`the new id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update the new id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM news WHERE id="${ id }";
                    `);
                    logger.info(`the new id:${ id } deleted`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`delete the new id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
