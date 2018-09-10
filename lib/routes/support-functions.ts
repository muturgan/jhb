import Base64 = require('js-base64');
export const base64 = Base64.Base64;

export const getIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    const id = +parts[parts.length - 1];
    return id;
}

export const createEntity = (query: {[key: string]: unknown}) => {
    let fields = '';
    let values = '';
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

export const updateEntity = (query: {[key: string]: unknown}) => {
    let key_values = '';
    for (let key in query) {
        if (key === 'permissions' || key === 'status') {
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
        if (key !== 'id' && key !== 'permissions' && key !== 'status' && entity[key]) {
            decodedEntity[key] = base64.decode(entity[key]);
            if (!isNaN(+decodedEntity[key])) {
                decodedEntity[key] = +decodedEntity[key];
            }
            if (decodedEntity[key] === 'true') {
                decodedEntity[key] = true;
            }
            if (decodedEntity[key] === 'false') {
                decodedEntity[key] = false;
            }
        }
    }
    return decodedEntity;
}