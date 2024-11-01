import { createConnection } from '../utils/dbCon';
import BitcoinClient from '../config/bitcoinClient';

interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export async function initTransaction(amount: number): Promise<{ txid: string; status: string }> {
    try {
        
        const newAddress = await BitcoinClient.getNewAddress();

        const txid = await BitcoinClient.sendToAddress(newAddress, amount);

        if (typeof txid !== 'string') {
            throw new Error('Transaction ID is not a string');
        }

        const status = 'pending';

        return { txid, status };
    } catch (error) {
        console.error('Error initiating transaction:', error);
        throw new Error('Transaction initiation failed.');
    }
}

export async function logTransaction(shopConfig: DBConfig, txData: any) {
    const connection = await createConnection(shopConfig);

    try {
        const [result] = await connection.execute(
            'INSERT INTO transactions (txid, amount, status) VALUES (?, ?, ?)',
            [txData.txid, txData.amount, txData.status]
        );
        return result;
    } catch (error) {
        console.error('Error logging transaction:', error);
    } finally {
        await connection.end();
    }
}
