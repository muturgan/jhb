import md5 = require('crypto-js/md5');
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


    private async _login(applicant: {login: string, password: string, isAdmin?: boolean}) {
        try {
            const rows: Array<{login: string, id: number, permissions: number}> = await db.sqlRequest(`
                SELECT login, id, permissions FROM users WHERE password="${ base64.encode(applicant.password) }";
            `);

            if (rows[0]) {
                if ( !applicant.isAdmin || (applicant.isAdmin && rows[0].permissions > 0) ) {
                    const token = md5(`Bearer: ${ applicant.login }`);
                    return { token: token.toString(), id: rows[0].id, code: 200 };
                } else {
                    return { token: '', id: 0, code: 403 };
                }
            } else {
                return { token: '', id: 0, code: 401 };
            }
        } catch (error) {
            throw error;
        }
    }

    private async _verifyToken(id: number, req: Request, isAdmin: boolean = false) {
        try {
            if ( !req.headers && !req.headers['authorization']) {
                return {authorized: false};
            } else {
                const rows = await db.sqlRequest(`
                    SELECT login, permissions FROM users WHERE id="${ id }";
                `);

                if (
                    rows[0]
                    && req.headers.authorization === md5(`Bearer: ${ base64.decode(rows[0].login) }`).toString()
                        ) {
                            return {authorized: true, permissions: rows[0].permissions};
                } else {
                    return {authorized: false};
                }
            }
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService;
export default authService;
