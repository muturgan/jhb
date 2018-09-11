import { createUserType, updateUserType } from '../types/customTypes'
import Base64 = require('js-base64');
export const base64 = Base64.Base64;

const checkUndecoding = (key: string): boolean => {
    if (
        key === 'id'
        || key === 'permissions'
        || key === 'status'
        || key === 'birthday'
        || key === 'creationdate'
        || key === 'updatingdate'
        || key === 'likes'
        || key === 'dislikes'
            ) {return true}
    return false;
}

export const getIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    const id = +parts[parts.length - 1];
    return id;
}

export const createEntity = (query: createUserType): {fields: string, values: string} => {
    let fields = 'creationdate, ';
    let values = 'NOW(), ';
    for (let key in query) {
        fields += `${ key }, `;
        if (key === 'permissions') {
            values += `'${ query[key] }', `;
        } else {
            values += `'${ base64.encode( String(query[key]) ) }', `;
        }
    }
    fields = fields.substring(0, fields.length - 2);
    values = values.substring(0, values.length - 2);
    return {fields, values}
}

export const updateEntity = (query: updateUserType): string => {
    let key_values = `updatingdate = NOW(), `;
    for (let key in query) {
        if ( checkUndecoding(key) ) {
            key_values += `${ key } = '${ query[key] }', `;
        } else {
            key_values += `${ key } = '${ base64.encode( String(query[key]) ) }', `;
        }
    }
    key_values = key_values.substring(0, key_values.length - 2);
    return key_values;
}

export const decodeEntity = (entity: {[key: string]: string|null }) => {
    const decodedEntity: {[key: string]: string|number|boolean|null } = entity;
        for (let key in entity) {
            const value = entity[key];
            if ( !checkUndecoding(key) && value) {
                decodedEntity[key] = base64.decode(value);
                const newValue = decodedEntity[key];
                if (newValue) {
                    if (!isNaN(+newValue)) {
                        decodedEntity[key] = +newValue;
                    }
                }
            }
        }
    return decodedEntity;
}

export const setFilters = (filters: {[key: string]: string }): string => {
    let filtersString = '';
    for (let key in filters) {
        if (checkUndecoding(key)) {
            filtersString += `${ key }=${ filters[key] } `;
        } else {
            filtersString += `${ key }='${ base64.encode(filters[key]) }' `;
        }
    }
    filtersString = `WHERE ${filtersString}`;
    return filtersString;
}
