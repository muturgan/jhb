import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';
import authService from '../auth-service';

export class ProjectsAdminRoutes {

    public routes(app): void {


        app.route('/api/admin/projects')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get projects list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                      if (validity.permissions !== 8) {
                        logger.error(`user with low permissions tried to get projects list as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(403);
                      } else {
                            let filters = '';
                            if (Object.keys(req.query).length) {
                                filters = setFilters(req.query);
                            }
                            const projects = await db.sqlRequest(`
                                SELECT * FROM projects ${filters};
                            `);
                            for (let i = 0; i < projects.length; i++) {
                                projects[i] = decodeEntity(projects[i]);
                            }
                            logger.info(`projects were sent to admin`);
                            res.status(200).send(projects);
                      }
                    }
                } catch (error) {
                    logger.error('projects sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to create new project as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                      if (validity.permissions !== 8) {
                       logger
                        .error(`user with low permissions tried to create new project list as admin`, Object.assign(req.body, req.headers));
                       res.sendStatus(403);
                      } else {
                            const project = createEntity(req.body);
                            await db.sqlRequest(`
                                INSERT INTO projects (${ project.fields }) VALUES (${ project.values });
                            `);
                            logger.info(`new project "${req.body.name}" created by admin`);
                            res.sendStatus(200);
                      }
                    }
                } catch (error) {
                    logger.error('new project creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/projects/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to get project info as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                            logger
                              .error(`user with low permissions tried to get project info as admin`, Object.assign(req.body, req.headers));
                            res.sendStatus(403);
                        } else {
                            const id = getIdFromUrl(req.originalUrl);

                            const rows = await db.sqlRequest(`
                                SELECT * FROM projects WHERE id=${ id };
                            `);
                            const project = decodeEntity(rows[0]);
                            logger.info(`project id:${ id } was sent to admin`);
                            res.status(200).send(project);
                        }
                    }
                } catch (error) {
                    logger.error(`project id:${ getIdFromUrl(req.originalUrl) } sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to update project info as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger
                            .error(`user with low permissions tried to update project info as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            const id = getIdFromUrl(req.originalUrl);
                            const updatedProject = updateEntity(req.body);
                            await db.sqlRequest(`
                                UPDATE projects SET ${ updatedProject } WHERE id="${ id }";
                            `);
                            logger.info(`project id:${ id } updated`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error(`update project id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const validity = await authService.verifyToken(req);

                    if (!validity.authorized) {
                        logger.error(`unauthorized user tried to delete project info as admin`, Object.assign(req.body, req.headers));
                        res.sendStatus(401);
                    } else {
                        if (validity.permissions !== 8) {
                          logger
                            .error(`user with low permissions tried to delete project info as admin`, Object.assign(req.body, req.headers));
                          res.sendStatus(403);
                        } else {
                            const id = getIdFromUrl(req.originalUrl);
                            await db.sqlRequest(`
                                DELETE FROM projects WHERE id="${ id }";
                            `);
                            logger.info(`project id:${ id } deleted by admin`);
                            res.sendStatus(200);
                        }
                    }
                } catch (error) {
                    logger.error(`delete project id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}
