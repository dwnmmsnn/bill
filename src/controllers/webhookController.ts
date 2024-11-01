import { Request, Response } from 'express';

export const txWebhook = (req: Request, res: Response): void => {
    const paymentData = req.body; // TX data sent from the Bitcoin network
    // Process the TX data here, e.g., update order status in your database
    console.log('Payment received:', paymentData);
    res.status(200).send('Webhook received');
};
