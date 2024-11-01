import { Request, Response } from 'express';
import BitcoinClient from '../config/bitcoinClient';
import { logTransaction } from '../services/txService';
import { initTransaction } from '../services/txService';
import { getShopDBConfig } from '../utils/dbConfig';

export const createTransaction = async (req: any, res: any) => {
    const { amount, userId, orderId } = req.body;
    const shopId = req.user.shopId;
    const shopConfig = getShopDBConfig(shopId);

    if (!amount || !userId || !orderId) {
        return res.status(400).json({ success: false, message: 'Missing required fields: amount, userId, or orderId.' });
    }

    try {
        const txData = await initTransaction(amount);
        await logTransaction(shopConfig, {
            txid: txData.txid,
            amount,
            userId,
            orderId,
            status: txData.status
        });

        res.status(201).json({ success: true, txid: txData.txid });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ success: false, message: 'Transaction creation failed.' });
    }
};

export const checkTX = async (req: Request, res: Response): Promise<void> => {
    try {
        const { txId } = req.body;
        const txInfo = await BitcoinClient.getTransaction(txId);
        res.json({ confirmations: txInfo.confirmations });
    } catch (error) {
        res.status(500).json({ error: 'Transaction not found' });
    }
};

