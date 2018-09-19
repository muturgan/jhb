import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import authService from '../auth-service';

export class AdminRoutes {

    public routes(app): void {

        app.route('/api/admin/login')
            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.login( {...req.body, isAdmin: true } );

                    switch (validity.code) {
                        case 200:
                            await db.sqlRequest(`
                                UPDATE users SET status = 'online' WHERE id = ${ validity.id };
                            `);
                            logger.info(`user id:${validity.id} login`);
                            res.status(200).send({token: validity.token, id: validity.id, login: validity.login, email: validity.email});
                            break;
                        case 401:
                            logger.info(`incorrect password by user ${req.body.email}`);
                            res.sendStatus(401);
                            break;
                        case 403:
                            logger.error(`user with low permissions tried to login as admin`, req.body);
                            res.sendStatus(403);
                            break;
                        default:
                            logger.error(`something wrong with autorization`, req.body);
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
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to logout as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                            logger.error(`user with low permissions tried to login as admin`, Object.assign(req.body, req.headers));
                            res.sendStatus(403);
                        } else {
                            await db.sqlRequest(`
                                UPDATE users SET status = 'offline' WHERE id = ${ validity.id };
                            `);
                            logger.info(`user id:${ validity.id } logout`);
                            res.sendStatus(200);
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
