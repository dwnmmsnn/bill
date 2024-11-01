"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTX = exports.createTransaction = void 0;
const bitcoinClient_1 = __importDefault(require("../config/bitcoinClient"));
const txService_1 = require("../services/txService");
const txService_2 = require("../services/txService");
const dbConfig_1 = require("../utils/dbConfig");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, userId, orderId } = req.body;
    const shopId = req.user.shopId;
    const shopConfig = (0, dbConfig_1.getShopDBConfig)(shopId);
    if (!amount || !userId || !orderId) {
        return res.status(400).json({ success: false, message: 'Missing required fields: amount, userId, or orderId.' });
    }
    try {
        const txData = yield (0, txService_2.initTransaction)(amount);
        yield (0, txService_1.logTransaction)(shopConfig, {
            txid: txData.txid,
            amount,
            userId,
            orderId,
            status: txData.status
        });
        res.status(201).json({ success: true, txid: txData.txid });
    }
    catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ success: false, message: 'Transaction creation failed.' });
    }
});
exports.createTransaction = createTransaction;
const checkTX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { txId } = req.body;
        const txInfo = yield bitcoinClient_1.default.getTransaction(txId);
        res.json({ confirmations: txInfo.confirmations });
    }
    catch (error) {
        res.status(500).json({ error: 'Transaction not found' });
    }
});
exports.checkTX = checkTX;
