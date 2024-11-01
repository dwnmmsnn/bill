import mysql, { Connection, createConnection } from 'mysql2/promise';

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Dwnn00??))',
    database: 'Id',
};

export const connection = async (): Promise<Connection> => {
    const conn = await createConnection(dbConfig);
    return conn;
};
