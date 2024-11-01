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
exports.initTransaction = initTransaction;
exports.logTransaction = logTransaction;
const dbCon_1 = require("../utils/dbCon");
const bitcoinClient_1 = __importDefault(require("../config/bitcoinClient"));
function initTransaction(amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAddress = yield bitcoinClient_1.default.getNewAddress();
            const txid = yield bitcoinClient_1.default.sendToAddress(newAddress, amount);
            if (typeof txid !== 'string') {
                throw new Error('Transaction ID is not a string');
            }
            const status = 'pending';
            return { txid, status };
        }
        catch (error) {
            console.error('Error initiating transaction:', error);
            throw new Error('Transaction initiation failed.');
        }
    });
}
function logTransaction(shopConfig, txData) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, dbCon_1.createConnection)(shopConfig);
        try {
            const [result] = yield connection.execute('INSERT INTO transactions (txid, amount, status) VALUES (?, ?, ?)', [txData.txid, txData.amount, txData.status]);
            return result;
        }
        catch (error) {
            console.error('Error logging transaction:', error);
        }
        finally {
            yield connection.end();
        }
    });
}
