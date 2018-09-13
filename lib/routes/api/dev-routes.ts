import { Request, Response } from 'express';
import db from '../../db-controller';
import path = require('path');
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class DevRoutes {    
    
    public routes(app): void {

        // DEV
        // ------------------------------------------
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send('The server works fine...');
        });

        app.route('/getLogs')
        .get((req: Request, res: Response) => {
            try {
                res.sendFile( path.join(__dirname, '/combined.log') );
                logger.info(`logs were sent to ${ req.ip }`);
            } catch (error) {
                logger.error(`failed to send logs tp ${ req.ip }`, error);
                res.status(500).send('logs sending failed...');
            }
        });

        app.route('/testDbConnection')
        .get( async (req: Request, res: Response) => {
            try {
                const rows = await db.sqlRequest(`SELECT * FROM example`);
                res.status(200).send('db connection is fine!');
            } catch (error) {
                res.status(500).send('db connection failed...');
            }
        });

        app.route('/mysqler')
        .post( async (req: Request, res: Response) => {
            try {
                const rows = await db.sqlRequest(req.body.query);
                res.status(200).send({
                    rows: rows,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });


        // NEWS
        // ------------------------------------------


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


        // USERS
        // ------------------------------------------


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


        // DEVICES
        // ------------------------------------------


        app.route('/api/admin/devices')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const devices = await db.sqlRequest(`
                        SELECT * FROM devices ${filters};
                    `);
                    for (let i = 0; i < devices.length; i++) {
                        devices[i] = decodeEntity(devices[i]);
                    }
                    logger.info(`devices were sent to admin`);
                    res.status(200).send(devices);
                } catch (error) {
                    logger.error('devices sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const device = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO devices (${ device.fields }) VALUES (${ device.values });
                    `);
                    logger.info(`new device "${req.body.query.imei}" created by admin`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new device creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/devices/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM devices WHERE id=${ id };
                    `);
                    const device = decodeEntity(rows[0]);
                    logger.info(`device id:${ id } was sent to admin`);
                    res.status(200).send(device);
                } catch (error) {
                    logger.error(`device id:${ getIdFromUrl(req.originalUrl) } sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedDevice = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE devices SET ${ updatedDevice } WHERE id="${ id }";
                    `);
                    logger.info(`device id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update device id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM devices WHERE id="${ id }";
                    `);
                    logger.info(`device id:${ id } deleted by admin`);
                    res.sendStatus(200);                        
                } catch (error) {
                    logger.error(`delete device id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        // PROJECTS
        // ------------------------------------------


        app.route('/api/admin/projects')
            .get( async (req: Request, res: Response) => {
                try {
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
                } catch (error) {
                    logger.error('projects sending to admin failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const project = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO projects (${ project.fields }) VALUES (${ project.values });
                    `);
                    logger.info(`new project "${req.body.query.name}" created by admin`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new project creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/projects/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM projects WHERE id=${ id };
                    `);
                    const project = decodeEntity(rows[0]);
                    logger.info(`project id:${ id } was sent to admin`);
                    res.status(200).send(project);
                } catch (error) {
                    logger.error(`project id:${ getIdFromUrl(req.originalUrl) } sending to admin failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedProject = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE projects SET ${ updatedProject } WHERE id="${ id }";
                    `);
                    logger.info(`project id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update project id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM projects WHERE id="${ id }";
                    `);
                    logger.info(`project id:${ id } deleted by admin`);
                    res.sendStatus(200);                        
                } catch (error) {
                    logger.error(`delete project id:${ getIdFromUrl(req.originalUrl) } by admin failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        // FWS
        // -------------------------------------------


        app.route('/api/admin/fws')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const fws = await db.sqlRequest(`
                        SELECT * FROM fws ${filters};
                    `);
                    for (let i = 0; i < fws.length; i++) {
                        fws[i] = decodeEntity(fws[i]);
                    }
                    logger.info(`fws were sent to admin`);
                    res.status(200).send(fws);
                } catch (error) {
                    logger.error('fws sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const fw = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO fws (${ fw.fields }) VALUES (${ fw.values });
                    `);
                    logger.info(`new fw "${req.body.query.name}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new fw creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/fws/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM fws WHERE id=${ id };
                    `);
                    const fw = decodeEntity(rows[0]);
                    logger.info(`fw id:${ id } was sent to admin`);
                    res.status(200).send(fw);
                } catch (error) {
                    logger.error(`fw id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedFw = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE fws SET ${ updatedFw } WHERE id="${ id }";
                    `);
                    logger.info(`fw id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update fw id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM fws WHERE id="${ id }";
                    `);
                    logger.info(`fw id:${ id } deleted`);
                    res.sendStatus(200);                        
                } catch (error) {
                    logger.error(`delete fw id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        // APPS
        // -------------------------------------------


        app.route('/api/admin/apps')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const apps = await db.sqlRequest(`
                        SELECT * FROM apps ${filters};
                    `);
                    for (let i = 0; i < apps.length; i++) {
                        apps[i] = decodeEntity(apps[i]);
                    }
                    logger.info(`apps were sent to admin`);
                    res.status(200).send(apps);
                } catch (error) {
                    logger.error('apps sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const app = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO apps (${ app.fields }) VALUES (${ app.values });
                    `);
                    logger.info(`new app "${req.body.query.name}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new app creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/apps/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM apps WHERE id=${ id };
                    `);
                    const app = decodeEntity(rows[0]);
                    logger.info(`app id:${ id } was sent to admin`);
                    res.status(200).send(app);
                } catch (error) {
                    logger.error(`app id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedApp = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE apps SET ${ updatedApp } WHERE id="${ id }";
                    `);
                    logger.info(`app id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update app id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM apps WHERE id="${ id }";
                    `);
                    logger.info(`app id:${ id } deleted`);
                    res.sendStatus(200);                        
                } catch (error) {
                    logger.error(`delete app id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );


        // FW-VERSIONS
        // -------------------------------------------


        app.route('/api/admin/fw-versions')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const fw_versions = await db.sqlRequest(`
                        SELECT * FROM fwversions ${filters};
                    `);
                    for (let i = 0; i < fw_versions.length; i++) {
                        fw_versions[i] = decodeEntity(fw_versions[i]);
                    }
                    logger.info(`fw-versions were sent to admin`);
                    res.status(200).send(fw_versions);
                } catch (error) {
                    logger.error('fw-versions sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const fw_version = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO fwversions (${ fw_version.fields }) VALUES (${ fw_version.values });
                    `);
                    logger.info(`new fw-version "${req.body.query.version}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new fw-version creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/fw-versions/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM fwversions WHERE id=${ id };
                    `);
                    const fw_version = decodeEntity(rows[0]);
                    logger.info(`fw-version id:${ id } was sent to admin`);
                    res.status(200).send(fw_version);
                } catch (error) {
                    logger.error(`fw-version id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedFwVersion = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE fwversions SET ${ updatedFwVersion } WHERE id="${ id }";
                    `);
                    logger.info(`fw-version id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update fw-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM fwversions WHERE id="${ id }";
                    `);
                    logger.info(`fw-version id:${ id } deleted`);
                    res.sendStatus(200);                        
                } catch (error) {
                    logger.error(`delete fw-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );



        // APP-VERSIONS
        // -------------------------------------------


        app.route('/api/admin/app-versions')
            .get( async (req: Request, res: Response) => {
                try {
                    let filters = '';
                    if (Object.keys(req.query).length) {
                        filters = setFilters(req.query);
                    }
                    const app_versions = await db.sqlRequest(`
                        SELECT * FROM appversions ${filters};
                    `);
                    for (let i = 0; i < app_versions.length; i++) {
                        app_versions[i] = decodeEntity(app_versions[i]);
                    }
                    logger.info(`app-versions were sent to admin`);
                    res.status(200).send(app_versions);
                } catch (error) {
                    logger.error('app-versions sending failed', error);
                    res.status(500).send(error);
                }
            })

            .post( async (req: Request, res: Response) => {
                try {
                    const app_version = createEntity(req.body.query);
                    await db.sqlRequest(`
                        INSERT INTO appversions (${ app_version.fields }) VALUES (${ app_version.values });
                    `);
                    logger.info(`new app-version "${req.body.query.version}" created`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error('new app-version creation failed', error);
                    res.status(500).send(error);
                }
            }
        );

        app.route('/api/admin/app-versions/:id')
            .get( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);

                    const rows = await db.sqlRequest(`
                        SELECT * FROM appversions WHERE id=${ id };
                    `);
                    const app_version = decodeEntity(rows[0]);
                    logger.info(`app-version id:${ id } was sent to admin`);
                    res.status(200).send(app_version);
                } catch (error) {
                    logger.error(`app-version id:${ getIdFromUrl(req.originalUrl) } sending failed`, error);
                    res.status(500).send(error);
                }
            })

            .put( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    const updatedAppVersion = updateEntity(req.body.query);
                    await db.sqlRequest(`
                        UPDATE app-versions SET ${ updatedAppVersion } WHERE id="${ id }";
                    `);
                    logger.info(`appversion id:${ id } updated`);
                    res.sendStatus(200);
                } catch (error) {
                    logger.error(`update app-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            })

            .delete( async (req: Request, res: Response) => {
                try {
                    const id = getIdFromUrl(req.originalUrl);
                    await db.sqlRequest(`
                        DELETE FROM app-versions WHERE id="${ id }";
                    `);
                    logger.info(`appversion id:${ id } deleted`);
                    res.sendStatus(200);                        
                } catch (error) {
                    logger.error(`delete app-version id:${ getIdFromUrl(req.originalUrl) } failed`, error);
                    res.status(500).send(error);
                }
            }
        );
    }
}