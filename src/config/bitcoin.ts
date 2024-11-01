// src/config/bitcoin.ts
import BitcoinClient from './bitcoinClient';
import ClientOptions from 'bitcoin-core-ts';

const client = new BitcoinClient({
    network: 'mainnet',
    host: process.env.BITCOIN_HOST as string,
    port: parseInt(process.env.BITCOIN_PORT as string, 10),
    username: process.env.BITCOIN_USER as string,
    password: process.env.BITCOIN_PASS as string
} as unknown as ClientOptions);

export default client;