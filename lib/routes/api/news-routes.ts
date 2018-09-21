import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, decodeEntity, setFilters } from '../support-functions';

export class NewsApiRoutes {

    public routes(app): void {

        app.route('/api/news')
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

                    logger.info(`news were sent`);
                    res.status(200).send(news);
                } catch (error) {
                    logger.error('news sending failed', error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/news/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM news WHERE id=${ id };
                    `);
                    const theNew = decodeEntity(rows[0]);
                    logger.info(`the new id:${ id } was sent`);
                    res.status(200).send(theNew);
                } catch (error) {
                    logger.error(`new id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
