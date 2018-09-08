import mysql = require('promise-mysql');
import mysqlConfig from './configs/mysql-db-config';

class MysqlDb {

    private _config = mysqlConfig;

    public get sqlRequest() {
        return this._sqlRequest;
    }

    private async _sqlRequest(req: string) {
        try {
            const connection = await mysql.createConnection(this._config);
            const rows = await connection.query(req);
            connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

export default new MysqlDb();
