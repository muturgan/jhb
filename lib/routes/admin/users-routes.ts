import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';
import authService from '../auth-service';

export class UsersAdminRoutes {

    public routes(app): void {

            app.route('/api/admin/users')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get users list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get users list as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            let filters = '';
                            if (Object.keys(req.query).length) {
                                filters = setFilters(req.query);
                            }
                            const users = await db.sqlRequest(`
                                SELECT * FROM users ${filters};
                            `);
                            for (let i = 0; i < users.length; i++) {
                                users[i] = decodeEntity(users[i]);
                            }
                            logger.info(`users were sent to admin`);
                            res.status(200).send(users);
                        }
                    }
                } catch (error) {
                    logger.error('users sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get users list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get users list as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            const user = createEntity(req.body);
                            await db.sqlRequest(`
                                INSERT INTO users (${ user.fields }) VALUES (${ user.values });
                            `);
                            logger.info(`new user "${req.body.login}" created by admin`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error('new user creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/users/:userId')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get users list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get users list as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            const userId = getIdFromUrl(req.originalUrl);

                            const rows = await db.sqlRequest(`
                                SELECT * FROM users WHERE id=${ userId };
                            `);
                            const user = decodeEntity(rows[0]);
                            logger.info(`user id:${ userId } info was sent to admin`);
                            res.status(200).send(user);
                        }
                    }
                } catch (error) {
                    logger.error(`user id:${ getIdFromUrl(req.originalUrl) } info sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get users list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get users list as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            const userId = getIdFromUrl(req.originalUrl);
                            const updatedUser = updateEntity(req.body);
                            await db.sqlRequest(`
                                UPDATE users SET ${ updatedUser } WHERE id="${ userId }";
                            `);
                            logger.info(`user id:${ userId } updated`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error(`update user id:${ getIdFromUrl(req.originalUrl) } by adminfailed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get users list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger.error(`user with low permissions tried to get users list as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            const userId = getIdFromUrl(req.originalUrl);
                            await db.sqlRequest(`
                                DELETE FROM users WHERE id="${ userId }";
                            `);
                            logger.info(`user id:${ userId } deleted by admin`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error(`delete user id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
