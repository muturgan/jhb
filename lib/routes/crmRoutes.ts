import { Request, Response } from 'express';

export class CrmRoutes {

    public routes(app): void {


        // --------------------------------------------------------
        // support

        app.route('/api/support')
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'You tried to create a new support report...'
            });
        });

        app.route('/api/support/history')
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'You got the support reports history...'
            });
        });


        // --------------------------------------------------------
        // partners

        app.route('/api/partners')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'You got the partners list...'
            });
        });

        app.route('/api/partners/:id')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'You got the single partner detail...'
            });
        });


        // --------------------------------------------------------
        // company

        app.route('/api/partners')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'You got the company info...'
            });
        });





        // Entity
        app.route('/entity')
        // GET endpoint
        .get((req: Request, res: Response) => {
        // Get all entities
            res.status(200).send({
                message: 'GET request successful.'
            });
        })
        // POST endpoint
        .post((req: Request, res: Response) => {
        // Create new entity
            res.status(200).send({
                message: 'POST request successful.'
            });
        });

        // Entity detail
        app.route('/entity/:entityId')
        // get specific entity
        .get((req: Request, res: Response) => {
        // Get a single entity detail
            res.status(200).send({
                message: 'GET request successful.'
            });
        })
        .put((req: Request, res: Response) => {
        // Update an entity
            res.status(200).send({
                message: 'PUT request successful.'
            });
        })
        .delete((req: Request, res: Response) => {
        // Delete an entity
            res.status(200).send({
                message: 'DELETE request successful.'
            });
        });
    }
}
