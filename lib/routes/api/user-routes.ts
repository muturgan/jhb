import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import authService from '../auth-service';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity } from '../support-functions';
import fs = require('fs');
import path = require('path');
import { base64 } from '../support-functions';


export class UserApiRoutes {

    public routes(app): void {

        app.route('/api/user')
            .post( async (req: Request, res: Response) => {
                try {
                    const user = createEntity(req.body);
                    await db.sqlRequest(`
                        INSERT INTO users (${ user.fields }) VALUES (${ user.values });
                    `);
                    logger.info(`new user ${req.body.login} created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new user creation failed', error);
                    res.status(500).send(error);
                }
            }
        );



        app.route('/api/user')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get user info`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        const rows = await db.sqlRequest(`
                            SELECT *, NULL AS password FROM users WHERE id=${ validity.id };
                        `);
                        const user = decodeEntity(rows[0]);
                        logger.info(`got user id:${ user.id } info`);
                        res.status(200).send({ user });
                    }
                } catch (error) {
                    logger.error(`get user info failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to update user info`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        const updatedUser = updateEntity(req.body);
                        await db.sqlRequest(`
                            UPDATE users SET ${ updatedUser } WHERE id=${ validity.id };
                        `);
                        logger.info(`user id:${ validity.id } info updated`);
                        res.sendStatus(200);
                    }
                } catch (error) {
                    logger.error(`update user info failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to delete user id:${ validity.id } info`);
                        res.sendStatus(401);
                    } else {
                        await db.sqlRequest(`
                            DELETE FROM users WHERE id="${ validity.id }";
                        `);
                        logger.info(`user id:${ validity.id } deleted`);
                        res.sendStatus(200);
                    }
                } catch (error) {
                    logger.error(`delete user failed`, error);
                    res.status(500).send(error);
                }
            }
        );



        app.route('/api/user/login')
            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.login(req.body);

                    switch (validity.code) {
                        case 200:
                            await db.sqlRequest(`
                                UPDATE users SET status = 'online' WHERE login = ${ base64.encode(req.body.login) };
                            `);
                            logger.info(`user ${req.body.login} login`);
                            res.status(200).send({token: validity.token});
                            break;
                        case 401:
                            logger.info(`incorrect password by user ${req.body.login}`);
                            res.sendStatus(401);
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


        app.route('/api/user/logout')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to logout user id:${ validity.id } info`);
                        res.sendStatus(401);
                    } else {
                        await db.sqlRequest(`
                            UPDATE users SET status = 'offline' WHERE id = ${ validity.id };
                        `);
                        logger.info(`user id:${ validity.id } logout`);
                        res.sendStatus(200);
                    }
                } catch (error) {
                    logger.error(`user logout failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/user/checking-update')
            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get fw versions info`, req);
                        res.sendStatus(401);
                    } else {
                        if (!req.body || !req.body.brand || !req.body.model) {
                            logger.error(`not enough data to get the current fw version info for user id:${ validity.id }`, req.body);
                            res.status(412)
                                .send(`Not enough data to get the current firmware version info. You must specify: brand, model`);
                        } else {
                            const versions = await db.sqlRequest(`
                                SELECT * FROM fwversions WHERE fullimage = 0;
                            `);

                            if (!versions.length) {
                                logger.error(`there is no fw versions for user's id:${ validity.id } device`, req.body);
                                res.status(204).send(`There is no firmware versions for your device`);
                            } else {
                                const version = decodeEntity( versions[versions.length - 1] );
                                logger.info(`current fw version info was sent to user id:${ validity.id }`);
                                res.status(200).send(version);
                            }
                        }
                    }
                } catch (error) {
                    logger.error(`current fw version info sending to user failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        app.route('/api/user/update')
            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to update fw version`);
                        res.sendStatus(401);
                    } else {
                        if (
                            !req.body
                            || !req.body.brand
                            || !req.body.model
                            || !('isRoot' in req.body)
                            ) {
                                if (!('isRoot' in req.body)) {
                                    logger
                                        .error(`there is no isRoot info in request from user id:${ validity.id }`, req.body);
                                    res.status(412)
                                        .send(`Your aplication can't send correct request`);
                                } else {
                                    logger
                                        .error(`not enough data to get the current fw version info for user id:${ validity.id }`, req.body);
                                    res.status(412)
                                        .send(`Not enough data to get the current firmware version info. You must specify: brand, model`);
                                }
                        } else {
                            if (req.body.isRoot) {
                                res.status(200).send('temporarily unavailable...');
                            } else {
                                 const versions = await db.sqlRequest(`
                                    SELECT * FROM fwversions WHERE fullimage = 1 AND ;
                                `);

                                if (!versions.length) {
                                    logger.error(`there is no fw versions for user's id:${ validity.id } device`, req.body);
                                    res.status(204).send(`There is no firmware versions for your device`);
                                } else {
                                    const version = decodeEntity( versions[versions.length - 1] );
                                    const versionPath = path.join(__dirname,
                                        `update/${
                                        req.body.brand }/${
                                        req.body.model }/${
                                        (version.version as string).substring(0, (version.version as string).length - 1) }/fullimage/${
                                        version.version }.txt`);
                                    fs.stat(versionPath, (error, stats) => {
                                        if (error || !stats.isFile()) {
                                    //         console.log('versionPath:');
                                    // console.log(versionPath);
                                            logger.error(`incorrect version request`, error);
                                            res.sendStatus(404);
                                        } else {
                                            res.sendFile(versionPath);
                                        }
                                    });
                                    // logger.info(`current fw version info was sent to user id:${ id }`);
                                    // res.status(200).send(version);
                                    res.sendStatus(200);
                                }
                                // res.sendStatus(200);
                                // fs.stat(path.join(__dirname, '/static/index.html'), () => {});
                            }
                            // const versions = await db.sqlRequest(`
                            //     SELECT * FROM fwversions WHERE fullimage = 0;
                            // `);

                            // if (!versions.length) {
                            //     logger.error(`there is no fw versions for user's id:${ id } device`, req.body);
                            //     res.status(204).send(`There is no firmware versions for your device`);
                            // } else {
                            //     const version = decodeEntity( versions[versions.length - 1] );
                            //     logger.info(`current fw version info was sent to user id:${ id }`);
                            //     res.status(200).send(version);
                            // }
                        }
                    }
                } catch (error) {
                    logger.error(`fw version updating by user failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
