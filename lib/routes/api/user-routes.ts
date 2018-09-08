import { Request, Response } from 'express';
import db from '../../db-controller';
import logger from 'logger';
import getIdFromUrl from '../get-id-from-url';

export class UserRoutes {    
    
    public routes(app): void {

        app.route('/api/user')
        .post( async (req: Request, res: Response) => {
            try {
                let fields = '';
                let values = '';
                for (let key in req.body.query) {
                    fields += `${ key }, `;
                    values += `'${ req.body.query[key] }', `;
                }
                fields = fields.substring(0, fields.length - 2);
                values = values.substring(0, values.length - 2);

                const rows = await db.sqlRequest(`
                    INSERT INTO usersj (${ fields }) VALUES (${ values });
                `);
                res.status(200).send({
                    rows: rows,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });

        app.route('/api/user/:id')
        .get( async (req: Request, res: Response) => {
            try {
                const id = getIdFromUrl(req.originalUrl);

                const rows = await db.sqlRequest(`
                    SELECT * FROM usersj WHERE id=${ id };
                `);
                res.status(200).send({
                    rows: rows,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        })
        .put( async (req: Request, res: Response) => {     
            try {
                const id = getIdFromUrl(req.originalUrl);

                let key_values = '';
                for (let key in req.body.query) {
                    key_values += `${ key } = '${ req.body.query[key] }', `;
                }
                key_values = key_values.substring(0, key_values.length - 2);

                const rows = await db.sqlRequest(`
                    UPDATE usersj SET ${ key_values } WHERE id="${ id }";
                `);
                res.status(200).send({
                    rows: rows,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        })
        .delete( async (req: Request, res: Response) => {
            try {
                const id = getIdFromUrl(req.originalUrl);

                const rows = await db.sqlRequest(`
                    DELETE FROM usersj WHERE id="${ id }";
                `);
                res.status(200).send({
                    rows: rows,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });

        app.route('/api/user/login')
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'You tried to login...'
            })
        });
    }
}