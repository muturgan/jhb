import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from '../../logger';
import { getIdFromUrl, createEntity, decodeEntity, updateEntity, setFilters } from '../support-functions';

export class DevicesAdminRoutes {

    public routes(app): void {


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
                    const device = createEntity(req.body);
                    await db.sqlRequest(`
                        INSERT INTO devices (${ device.fields }) VALUES (${ device.values });
                    `);
                    logger.info(`new device "${req.body.imei}" created by admin`);
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
                    const updatedDevice = updateEntity(req.body);
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
    }
}
