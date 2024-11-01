import { Router } from 'express';
import { logTransaction } from '../services/txService';
import { authJWT } from '../jwt/jwt';
import { getShopDBConfig } from '../utils/dbConfig';


const txRouter = Router();

txRouter.post('/process-tx', authJWT, async (req: any, res: any) => {
    const txData = req.body;
    const shopConfig = getShopDBConfig(req.user.shopId); // retrieve shops DB config

    try {
        await logTransaction(shopConfig, txData);
        res.status(200).send('Transaction logged successfully.');
    } catch (error) {
        res.status(500).send('Error logging transaction.');
    }
});

export default txRouter;