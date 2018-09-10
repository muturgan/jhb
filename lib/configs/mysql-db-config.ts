import { mysqlConfigType } from '../types/mysql-config-type';

import dotenv = require('dotenv');
dotenv.config();

const mysqlConfig: mysqlConfigType = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
};

export default mysqlConfig;
