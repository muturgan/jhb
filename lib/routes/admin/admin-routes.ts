import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import authService from '../auth-service';
import { attackerDetails } from '../support-functions';

export class AdminRoutes {

    public routes(app): void {

        app.route('/api/admin/login')
            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.login( req.body.email, req.body.password, true );

                    switch (validity.code) {
                        case 200:
                            await db.sqlRequest(`
                                UPDATE officers SET isOnline = 1 WHERE id = ${ validity.id };
                            `);
                            logger.info(`user id:${validity.id} login`);
                            res.status(200).send({token: validity.token, id: validity.id, login: validity.login, email: validity.email});
                            break;
                        case 401:
                            logger.info(`incorrect password by user ${req.body.email}`);
                            res.sendStatus(401);
                            break;
                        default:
                            logger.error(`something wrong with autorization`, attackerDetails(req));
                    }
                } catch (error) {
                    logger.error(`login failed for ${req.body.login}`, error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/logout')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req, true);

                    if (validity) {
                        if (!validity.authorized) {
                            logger.error(`unauthorized user tried to logout as admin`, attackerDetails(req));
                            res.sendStatus(401);
                        } else {
                            if (validity.permissions !== 8) {
                                logger.error(`user with low permissions tried to login as admin`, attackerDetails(req));
                                res.sendStatus(403);
                            } else {
                                await db.sqlRequest(`
                                    UPDATE officers SET isOnline = 0 WHERE id = ${ validity.id };
                                `);
                                logger.info(`user id:${ validity.id } logout`);
                                res.sendStatus(200);
                            }
                        }
                    } else {
                        logger.error(`admin logout failed`, {validity});
                        res.status(500).send({validity});
                    }
                } catch (error) {
                    logger.error(`admin logout failed`, error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/is-admin')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req, true);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get permissions info`, attackerDetails(req));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions === 8) {
                            logger.info(`user id:${ validity.id } informed that he is an admin`);
                            res.status(200).send(true);
                        } else {
                            logger.info(`user id:${ validity.id } informed that he is not an admin`);
                            res.status(200).send(false);
                        }
                    }
                } catch (error) {
                    logger.error(`admin logout failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
