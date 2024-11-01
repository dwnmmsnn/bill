import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getSecretKey } from '../utils/sql';

const JWT_SECRET = process.env.JWT_SECRET || 'l0cn1nc0ln0clnlJTl10lTCl1010lclc';

export const signin = async (req: Request, res: Response) => {
    const { shopId, secretKey } = req.body;

    try {
        const storedSecretKey = await getSecretKey(shopId);

        if (storedSecretKey && secretKey === storedSecretKey) {
            const token = jwt.sign({ shopId, secretKey }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(403).json({ message: 'Invalid shopId or secretKey' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};