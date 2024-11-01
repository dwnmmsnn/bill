"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txWebhook = void 0;
const txWebhook = (req, res) => {
    const paymentData = req.body; // TX data sent from the Bitcoin network
    // Process the TX data here, e.g., update order status in your database
    console.log('Payment received:', paymentData);
    res.status(200).send('Webhook received');
};
exports.txWebhook = txWebhook;
