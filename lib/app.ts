import express = require('express');
import { Routes } from './routes/crmRoutes';
import { DevRoutes } from './routes/api/dev-routes';
import { UserRoutes } from './routes/api/user-routes';
import http = require('http');

class App {

    public app: express.Application;
    private _routePrv: Routes = new Routes();
    private _devRoutes: Routes = new DevRoutes();
    private _userRoutes: Routes = new UserRoutes();

    constructor() {
        this.app = express();
        this.config();        
        this._routePrv.routes(this.app); 
        this._devRoutes.routes(this.app);
        this._userRoutes.routes(this.app);
    }

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

}

const app = new App().app;
const server = new http.Server(app);
export default server;
