
// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { createConnection } from '../utils/dbCon'; // Ensure this path is correct

const secretKey = process.env.JWT_SECRET || 'your_default_secret_key';

export const authJWT: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.sendStatus(403); // Forbidden if no token is provided
        return; // Early return to stop execution
    }

    try {
        // Decode and verify the JWT token
        const decoded = jwt.verify(token, secretKey) as { shopID: string };

        // Retrieve shop configuration from the database
        const shopConfig = await createConnection(decoded.shopID);
        
        if (!shopConfig) {
            res.sendStatus(403); // Forbidden if shop config not found
            return; // Early return to stop execution
        }

        // Attach shopID and secretKey to request for later use
        req.user = { shopId: decoded.shopID, secretKey: shopConfig.secretKey }; // Make sure shopConfig has secretKey

        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error('Error in authJWT:', error);
        res.sendStatus(403); // Forbidden if verification fails
    }
};
