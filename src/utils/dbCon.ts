import mysql from 'mysql2/promise';

interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export async function createConnection(config: DBConfig) {
    return await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
    });
}
