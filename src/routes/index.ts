import { Router } from 'express';
import { createAddress } from '../controllers/addressController';
import { checkTX } from '../controllers/txController';
import { txWebhook } from '../controllers/webhookController';
import txRouter from './txRoutes';
import { authJWT } from '../jwt/jwt';
import { signin } from '../controllers/jwtController';

const router = Router();

router.post('/signin', signin);

router.post('/create-address', authJWT, createAddress);
router.post('/check-tx', authJWT, checkTX);
router.post('/webhook', txWebhook);
router.use('/transactions', txRouter);

export default router;
