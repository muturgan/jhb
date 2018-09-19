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


    private async _login(applicant: {email: string, password: string, isAdmin?: boolean}) {
        try {
            console.log(base64.decode('QW5kcmV5'));
            console.log(base64.decode('YW5kcmV5'));
            console.log(base64.decode('Y2F4YXBAaXR0LmNvbQ=='));
            console.log(base64.decode('MTM1Mzg2NA=='));
            const rows: Array<{id: number, login: string, email: string, permissions: number}> = await db.sqlRequest(`
                SELECT id, login, email, permissions FROM users WHERE password='${ base64.encode(applicant.password) }' AND email='${ base64.encode(applicant.email) }';
            `);

            if (rows[0]) {
                if ( !applicant.isAdmin || (applicant.isAdmin && rows[0].permissions > 0) ) {
                    const token = rows[0].email + '^@' + md5(`Bearer: ${ rows[0].id }`);
                    console.log('token:');
                    console.log(token);
                    return { token: token.toString(), code: 200, id: rows[0].id, login: base64.decode(rows[0].login), email: base64.decode(rows[0].email)};
                } else {
                    return { token: '', code: 403, id: 0, login: '', email: '' };
                }
            } else {
                return { token: '', code: 401, id: 0, login: '', email: '' };
            }
        } catch (error) {
            throw error;
        }
    }

    private async _verifyToken(req: Request) {
        try {
            if ( !req.headers || !req.headers['authorization']) {
                return {authorized: false, permissions: 0, id: 0};
            } else {
                const splitedToken = (req.headers['authorization'] as string).split('^@');
                const rows: Array<{id: number, email: string, permissions: number}> = await db.sqlRequest(`
                    SELECT id, email, permissions FROM users WHERE login="${ splitedToken[0] }";
                `);

                if (
                    rows[0]
                    && splitedToken[1] === md5(`Bearer: ${ rows[0].email }`).toString()
                        ) {
                            return {authorized: true, permissions: rows[0].permissions, id: rows[0].id};
                } else {
                    return {authorized: false, permissions: 0, id: 0};
                }
            }
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService;
export default authService;
