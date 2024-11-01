// src/controllers/addressController.ts
import { Request, Response } from 'express';
import client from '../config/bitcoin';

export const createAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const address = await client.getNewAddress();
        res.json({ address });
    } catch (error) {
        res.status(500).json({ error: 'Could not generate address' });
    }
};

