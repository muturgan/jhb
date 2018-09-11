import md5 = require("crypto-js/md5");
import { base64 } from './support-functions';
import db from '../db-controller';
import { Request } from 'express';

class AuthService {

    public get login() {
        return this._login;
    }

    public get verifyToken() {
        return this._verifyToken;
    }


    private async _login(applicant: {login: string, password: string}) {
        try {
            const rows: Array<{login: string, id: number}> = await db.sqlRequest(`
                SELECT login, id FROM usersj WHERE password="${ base64.encode(applicant.password) }";
            `);

            if (rows[0]) {
                const token = md5(`Bearer: ${ applicant.login }`);
                return { token: token.toString(), id: rows[0].id };
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    private async _verifyToken(id: number, req: Request) {
        try {
            if ( !req.headers && !req.headers['authorization']) {
                return false;
            } else {
                const rows = await db.sqlRequest(`
                    SELECT login FROM usersj WHERE id="${ id }";
                `);

                if (
                    rows[0]
                    && req.headers.authorization === md5(`Bearer: ${ base64.decode(rows[0].login) }`).toString()
                        ) {
                            console.log('true');
                            return true;
                } else {
                    console.log('false');
                    return false;
                }
            }
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService;
export default authService;