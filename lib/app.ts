import express = require('express');
import bodyParser = require('body-parser');
import { CrmRoutes } from './routes/crmRoutes';
import { DevRoutes } from './routes/dev-routes';
import { UserApiRoutes } from './routes/api/user-routes';
import { NewsApiRoutes } from './routes/api/news-routes';
import { FwVersionsApiRoutes } from './routes/api/fw-versions-routes';
import { UsersAdminRoutes } from './routes/admin/users-routes';
import { DevicesAdminRoutes } from './routes/admin/devices-routes';
import { ProjectsAdminRoutes } from './routes/admin/projects-routes';
import { FwsAdminRoutes } from './routes/admin/fws-routes';
import { AppsAdminRoutes } from './routes/admin/apps-routes';
import { FwVersionsAdminRoutes } from './routes/admin/fw-versions-routes';
import { AppVersionsAdminRoutes } from './routes/admin/app-versions-routes';
import { NewsAdminRoutes } from './routes/admin/news-routes';
import http = require('http');

class App {

    public readonly app: express.Application = express();
    private _routePrv: CrmRoutes = new CrmRoutes();
    private _devRoutes: DevRoutes = new DevRoutes();
    private _userApiRoutes: UserApiRoutes = new UserApiRoutes();
    private _newsApiRoutes: NewsApiRoutes = new NewsApiRoutes();
    private _fwVersionsApiRoutes: FwVersionsApiRoutes = new FwVersionsApiRoutes();
    private _userAdminRoutes: UsersAdminRoutes = new UsersAdminRoutes();
    private _devicesAdminRoutes: DevicesAdminRoutes = new DevicesAdminRoutes();
    private _projectsAdminRoutes: ProjectsAdminRoutes = new ProjectsAdminRoutes();
    private _fwsAdminRoutes: FwsAdminRoutes = new FwsAdminRoutes();
    private _appsAdminRoutes: AppsAdminRoutes = new AppsAdminRoutes();
    private _fwVersionsAdminRoutes: FwVersionsAdminRoutes = new FwVersionsAdminRoutes();
    private _appVersionsAdminRoutes: AppVersionsAdminRoutes = new AppVersionsAdminRoutes();
    private _newsAdminRoutes: NewsAdminRoutes = new NewsAdminRoutes();

    constructor() {
        this._config();
        this._setApiRoutes();
        this._setAdminRoutes();
    }

    private _config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private _setApiRoutes(): void {
        this._routePrv.routes(this.app);
        this._devRoutes.routes(this.app);
        this._userApiRoutes.routes(this.app);
        this._newsApiRoutes.routes(this.app);
        this._fwVersionsApiRoutes.routes(this.app);
        this._newsAdminRoutes.routes(this.app);
    }

    private _setAdminRoutes(): void {
        this._userAdminRoutes.routes(this.app);
        this._devicesAdminRoutes.routes(this.app);
        this._projectsAdminRoutes.routes(this.app);
        this._fwsAdminRoutes.routes(this.app);
        this._appsAdminRoutes.routes(this.app);
        this._fwVersionsAdminRoutes.routes(this.app);
        this._appVersionsAdminRoutes.routes(this.app);
    }

}

const app = new App().app;
const server = new http.Server(app);
export default server;
