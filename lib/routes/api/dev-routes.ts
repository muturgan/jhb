import { Request, Response } from 'express';
import db from '../../db-controller';

export class DevRoutes {    
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send('GET request successful.');
        });

        app.route('/testDbConnection')
        .get( async (req: Request, res: Response) => {
            try {
                const rows = await db.sqlRequest(`SELECT * FROM usersj`);
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
    }
}