import md5 = require('crypto-js/md5');
import { base64 } from './support-functions';
import db from '../db-controller';
import { Request } from 'express';
import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
dotenv.config();

class AuthService {

    public get login() {
        return this._login;
    }

    public get verifyToken() {
        return this._verifyToken;
    }


    private async _login(applicant: {email: string, password: string, isAdmin?: boolean}) {
        try {
            const rows: Array<{id: number, login: string, email: string, permissions: number}> = await db.sqlRequest(`
                SELECT id, login, email, permissions FROM users WHERE password='${ base64.encode(applicant.password) }' AND email='${ base64.encode(applicant.email) }';
            `);

            if (rows[0]) {
                if ( !applicant.isAdmin || (applicant.isAdmin && rows[0].permissions > 0) ) {
                    // const token = rows[0].email + '^@' + md5(`Bearer: ${ rows[0].id }`);
                    const token = jwt.sign({ id: rows[0].id }, process.env.SECRET as string, {expiresIn: 86400}); // expires in 24 hours
                    return { token: token, code: 200, id: rows[0].id, login: base64.decode(rows[0].login), email: base64.decode(rows[0].email)};
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
                const token = req.headers['authorization'] as string;
                let decodedToken;
                jwt.verify(token, process.env.SECRET as string, (error, decoded) => {
                    if (error) {
                        throw error;
                    } else {
                        decodedToken = decoded;
                    }
                });
                const rows: Array<{email: string, permissions: number}> = await db.sqlRequest(`
                    SELECT email, permissions FROM users WHERE id="${ decodedToken['id'] }";
                `);

                if (rows[0]) {
                    return {authorized: true, permissions: rows[0].permissions, id: decodedToken['id']};
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
