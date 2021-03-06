import Base64 = require('js-base64');
export const base64 = Base64.Base64;
import { Request } from 'express';

const checkUndecoding = (key: string): boolean => {
    if (
        key === 'id'
        || key === 'permissions'
        || key === 'birthday'
        || key === 'creationdate'
        || key === 'updatingdate'
        || key === 'likes'
        || key === 'dislikes'
        || key === 'latest'
        || key === 'fwID'
        || key === 'appID'
        || key === 'fullimage'
        || key === 'isOnline'
        || key === 'isActive'
            ) {return true; }
    return false;
};

export const getIdFromUrl = (url: string, depth: number = 0): number => {
    const parts = url.split('/');
    const id = +parts[parts.length - (1 + depth)];
    return id;
};

export const createEntity = (query: {[key: string]: string|number|boolean|Array<string>}): {fields: string, values: string} => {
    delete query.id;
    delete query.creationdate;
    delete query.updatingdate;

    let fields = 'creationdate, ';
    let values = 'NOW(), ';

    for (const key in query) {
        fields += `${ key }, `;

        if (checkUndecoding(key)) {
            if (key === 'isOnline' || key === 'isActive') {
                values += `${ query[key] }, `;
            } else {
                values += `'${ query[key] }', `;
            }

        } else {
            if (Array.isArray(query[key])) {
                values += `'${ base64.encode(JSON.stringify(query[key])) }', `;
            } else {
                values += `'${ base64.encode(query[key] as string) }', `;
            }
        }
    }

    fields = fields.substring(0, fields.length - 2);
    values = values.substring(0, values.length - 2);
    return {fields, values};
};

export const updateEntity = (query: {[key: string]: string|number|boolean|Array<string>}): string => {
    delete query.id;
    delete query.creationdate;
    delete query.updatingdate;

    let key_values = `updatingdate = NOW(), `;

    for (const key in query) {
        if ( checkUndecoding(key) ) {
            if (key === 'isOnline' || key === 'isActive') {
                key_values += `${ key } = ${ query[key] }, `;
            } else {
                key_values += `${ key } = '${ query[key] }', `;
            }

        } else {
            if (Array.isArray(query[key])) {
                key_values += `${ key } = '${ base64.encode( JSON.stringify(query[key])) }', `;
            } else {
                key_values += `${ key } = '${ base64.encode( query[key] as string ) }', `;
            }
        }
    }

    key_values = key_values.substring(0, key_values.length - 2);
    return key_values;
};

export const decodeEntity = (entity: {[key: string]: string|null }) => {
    const decodedEntity: {[key: string]: string|number|Buffer|null } = {};

    Object.assign(decodedEntity, entity);

        for (const key in decodedEntity) {
            const value = decodedEntity[key];

            if (key === 'isOnline' || key === 'isActive') {
                decodedEntity[key] = (value as Buffer)[0];
            }

            if (!checkUndecoding(key) && value) {
                decodedEntity[key] = base64.decode(value as string);
                const newValue = decodedEntity[key];
                if (newValue) {
                    if (!isNaN(+newValue)) {
                        decodedEntity[key] = +newValue;
                    }
                }
            }
        }
    return decodedEntity;
};



export const setFilters = (filters: {[key: string]: string }): string => {
    let filtersString = '';
    for (const key in filters) {
        if (checkUndecoding(key)) {
            filtersString += `${ key }=${ filters[key] } AND `;
        } else {
            filtersString += `${ key }='${ base64.encode(filters[key]) }' AND `;
        }
    }
    filtersString = `WHERE ${filtersString.substring(0, filtersString.length - 5)}`;
    return filtersString;
};

export const attackerDetails = (req: Request) => {
    const attacker = {
        body: req.body,
        cookies: req.cookies,
        headers: req.headers,
        params: req.params,
        method: req.method,
        hostname: req.hostname,
        ip: req.ip,
        originalUrl: req.originalUrl,
        fresh: req.fresh,
        stale: req.stale,
    };

    return attacker;
};
