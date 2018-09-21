import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters, attackerDetails } from '../support-functions';
import authService from '../auth-service';

export class OfficersAdminRoutes {

    public routes(app): void {


            app.route('/api/admin/officers')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req, true);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get officers list as admin`, attackerDetails(req));
                        res.sendStatus(401);
                    } else {

                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get officers list as admin`, attackerDetails(req));
                          res.sendStatus(403);
                        } else {

                            let filters = '';
                            if (Object.keys(req.query).length) {
                                filters = setFilters(req.query);
                            }

                            const officers = await db.sqlRequest(`
                                SELECT *, NULL AS password FROM officers ${filters};
                            `);

                            for (let i = 0; i < officers.length; i++) {
                                officers[i] = decodeEntity(officers[i]);
                            }

                            logger.info(`officers were sent to admin`);
                            res.status(200).send(officers);
                        }
                    }
                } catch (error) {
                    logger.error('officers sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req, true);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to create new officer as admin`, attackerDetails(req));
                        res.sendStatus(401);
                    } else {

                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to create new officer as admin`, attackerDetails(req));
                          res.sendStatus(403);
                        } else {

                            const officer = createEntity(req.body);
                            await db.sqlRequest(`
                                INSERT INTO officers (${ officer.fields }) VALUES (${ officer.values });
                            `);

                            logger.info(`new officer "${req.body.login}" created by admin`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error('new officer creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/officers/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(req, true);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get officer id:${id} info as admin`, attackerDetails(req));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get officer id:${id} info as admin`, attackerDetails(req));
                          res.sendStatus(403);
                        } else {
                            const rows = await db.sqlRequest(`
                                SELECT *, NULL AS password FROM officers WHERE id=${ id };
                            `);
                            const officer = decodeEntity(rows[0]);
                            logger.info(`officer id:${ id } info was sent to admin`);
                            res.status(200).send(officer);
                        }
                    }
                } catch (error) {
                    logger.error(`officer id:${ getIdFromUrl(req.originalUrl) } info sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(req, true);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to update officer id:${id} info as admin`, attackerDetails(req));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to update officer id:${id} info as admin`, attackerDetails(req));
                          res.sendStatus(403);
                        } else {
                            const updatedOfficer = updateEntity(req.body);
                            await db.sqlRequest(`
                                UPDATE officers SET ${ updatedOfficer } WHERE id="${ id }";
                            `);
                            logger.info(`officer id:${ id } updated`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error(`update officer id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(req, true);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to delete officer id:${id} info as admin`, attackerDetails(req));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to delete officer id:${id} info as admin`, attackerDetails(req));
                          res.sendStatus(403);
                        } else {
                            await db.sqlRequest(`
                                DELETE FROM officers WHERE id="${ id }";
                            `);
                            logger.info(`officer id:${ id } deleted by admin`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error(`delete officer id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
