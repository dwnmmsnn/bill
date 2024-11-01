"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressController_1 = require("../controllers/addressController");
const txController_1 = require("../controllers/txController");
const webhookController_1 = require("../controllers/webhookController");
const txRoutes_1 = __importDefault(require("./txRoutes"));
const jwt_1 = require("../jwt/jwt");
const jwtController_1 = require("../controllers/jwtController");
const router = (0, express_1.Router)();
router.post('/signin', jwtController_1.signin);
router.post('/create-address', jwt_1.authJWT, addressController_1.createAddress);
router.post('/check-tx', jwt_1.authJWT, txController_1.checkTX);
router.post('/webhook', webhookController_1.txWebhook);
router.use('/transactions', txRoutes_1.default);
exports.default = router;
