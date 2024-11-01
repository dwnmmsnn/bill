import { Request } from 'express';

declare module 'express' {
    interface Request {
        user?: {
            secretKey: string;
            shopId: string;
        };
    }
}