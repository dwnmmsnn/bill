import { connection } from '../utils/db';
import { RowDataPacket } from 'mysql2';

interface Shop extends RowDataPacket {
    secretKey: string;
}

export async function getSecretKey(shopId: string): Promise<string | null> {
    try {
        const conn = await connection(); 

        const [rows]: [Shop[], any] = await conn.query<Shop[]>('SELECT secretKey FROM Id WHERE Id = ?', [shopId]);

        if (rows.length > 0) {
            return rows[0].secretKey;
        }
        return null;
    } catch (error) {
        console.error('Error fetching secret key:', error);
        return null;
    }
}
