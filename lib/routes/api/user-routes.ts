import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import authService from '../auth-service';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity } from '../support-functions';

export class UserApiRoutes {    
    
    public routes(app): void {

        app.route('/api/user')
            .post( async (req: Request, res: Response) => {
                try {
                    const user = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO usersj (${ user.fields }) VALUES (${ user.values });
                    `);
                    logger.info(`new user ${req.body.query.login} created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new user creation failed', error);
                    res.status(500).send(error);
                }
            }
        );



        app.route('/api/user/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(id, req);

                    if (!validity) {
                        logger.error(`unauthorized user tried to get user id:${ id } info`);
                        res.sendStatus(401);
                    } else {
                        const rows = await db.sqlRequest(`
                            SELECT *, NULL AS password FROM usersj WHERE id=${ id };
                        `);
                        const user = decodeEntity(rows[0]);
                        logger.info(`got user id:${ user.id } info`);
                        res.status(200).send({ user });
                    }
                } catch (error) {
                    logger.error(`get user id:${ getIdFromUrl(req.originalUrl) } info failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(id, req);

                    if (!validity) {
                        logger.error(`unauthorized user tried to update user id:${ id } info`);
                        res.sendStatus(401);
                    } else {
                        const updatedUser = updateEntity(req.body.query);
                        await db.sqlRequest(`
                            UPDATE usersj SET ${ updatedUser } WHERE id="${ id }";
                        `);
                        logger.info(`user id:${ id } info updated`);
                        res.sendStatus(200);
                    }
                } catch (error) {
                    logger.error(`update user id:${ getIdFromUrl(req.originalUrl) } info failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(id, req);

                    if (!validity) {
                        logger.error(`unauthorized user tried to delete user id:${ id } info`);
                        res.sendStatus(401);
                    } else {
                        await db.sqlRequest(`
                            DELETE FROM usersj WHERE id="${ id }";
                        `);
                        logger.info(`user id:${ id } deleted`);
                        res.sendStatus(200);                        
                    }
                } catch (error) {
                    logger.error(`delete user id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );



        app.route('/api/user/login')
            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.login(req.body.query);

                    if (!validity) {
                        logger.info(`incorrect password`);
                        res.sendStatus(401);
                    } else {
                        await db.sqlRequest(`
                            UPDATE usersj SET status = 'online' WHERE id = ${ validity.id };
                        `);
                        logger.info(`user id:${validity.id} login`);
                        res.status(200).send(validity);
                    }
                } catch (error) {
                    logger.error('login failed', error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/user/logout/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const validity = await authService.verifyToken(id, req);

                    if (!validity) {
                        logger.error(`unauthorized user tried to logout user id:${ id } info`);
                        res.sendStatus(401);
                    } else {
                        await db.sqlRequest(`
                            UPDATE usersj SET status = 'offline' WHERE id = ${ id };
                        `);
                        logger.info(`user id:${ id } logout`);
                        res.sendStatus(200);                       
                    }
                } catch (error) {
                    logger.error(`user id:${ getIdFromUrl(req.originalUrl) } logout failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}