import express = require('express');
import bodyParser = require('body-parser');
import { Routes } from './routes/crmRoutes';
import { DevRoutes } from './routes/api/dev-routes';
import { UserApiRoutes } from './routes/api/user-routes';
import { NewsApiRoutes } from './routes/api/news-routes';
import http = require('http');

class App {

    public app: express.Application;
    private _routePrv: Routes = new Routes();
    private _devRoutes: Routes = new DevRoutes();
    private _userApiRoutes: Routes = new UserApiRoutes();
    private _newsApiRoutes: Routes = new NewsApiRoutes();

    constructor() {
        this.app = express();
        this.config();        
        this._routePrv.routes(this.app); 
        this._devRoutes.routes(this.app);
        this._userApiRoutes.routes(this.app);
        this._newsApiRoutes.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

const app = new App().app;
const server = new http.Server(app);
export default server;
