export type mysqlConfigType = {
    readonly host: string,
    readonly user: string,
    readonly password: string,
    readonly database: string,
    readonly port: number,
};

export type userType = {
    id: number,
    login: string,
    password: null,
    email: string,
    phone: string,
    fullname?: string,
    birthday?: string,
    index?: string,
    city?: string,
    street?: string,
    building?: string,
    permissions: number,
    comment?: string,
    status: string,
    updatingdate?: string,
    creationdate: string,
};

export type createUserType = {
    login: string,
    password: string,
    email: string,
    phone: string,
    fullname?: string,
    birthday?: string,
    index?: string,
    city?: string,
    street?: string,
    building?: string,
    comment?: string,
};

export type updateUserType = {
    login?: string,
    password?: string,
    email?: string,
    phone?: string,
    fullname?: string,
    birthday?: string,
    index?: string,
    city?: string,
    street?: string,
    building?: string,
    comment?: string,
};
