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
        || key === 'latest'
        || key === 'fwID'
        || key === 'appID'
            ) {return true}
    return false;
}

export const getIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    const id = +parts[parts.length - 1];
    return id;
}

export const createEntity = (query: {[key: string]: string|number|boolean|Array<string>}): {fields: string, values: string} => {
    console.log('query:');
    console.log(query);
    let fields = 'creationdate, ';
    let values = 'NOW(), ';
    for (let key in query) {
        fields += `${ key }, `;
        if (checkUndecoding(key)) {
            values += `'${ query[key] }', `;
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
    return {fields, values}
}

export const updateEntity = (query: {[key: string]: string|number|boolean|Array<string>}): string => {
    let key_values = `updatingdate = NOW(), `;
    for (let key in query) {
        if ( checkUndecoding(key) ) {
            key_values += `${ key } = '${ query[key] }', `;
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
}

export const decodeEntity = (entity: {[key: string]: string|null }) => {
    const decodedEntity: {[key: string]: string|number|null } = {};
    Object.assign(decodedEntity, entity);
        for (let key in decodedEntity) {
            const value = decodedEntity[key];
            if ( !checkUndecoding(key) && value) {
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
