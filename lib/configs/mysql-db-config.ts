import { mysqlConfigType } from 'types/customTypes';

import dotenv = require('dotenv');
dotenv.config();

const mysqlConfig: mysqlConfigType = {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    port: +(process.env.DB_PORT as string),
};

export default mysqlConfig;
