import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class UsersAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/users')
            .get( async (req: Request, res: Response) => {
                try {
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
                } catch (error) {
                    logger.error('users sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const user = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO users (${ user.fields }) VALUES (${ user.values });
                    `);
                    logger.info(`new user "${req.body.query.login}" created by admin`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new user creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/users/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM users WHERE id=${ id };
                    `);
                    const user = decodeEntity(rows[0]);
                    logger.info(`user id:${ id } was sent to admin`);
                    res.status(200).send(user);
                } catch (error) {
                    logger.error(`user id:${ getIdFromUrl(req.originalUrl) } sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedUser = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE users SET ${ updatedUser } WHERE id="${ id }";
                    `);
                    logger.info(`user id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update user id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM users WHERE id="${ id }";
                    `);
                    logger.info(`user id:${ id } deleted by admin`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`delete user id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
