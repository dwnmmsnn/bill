"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/bitcoin.ts
const bitcoinClient_1 = __importDefault(require("./bitcoinClient"));
const client = new bitcoinClient_1.default({
    network: 'mainnet',
    host: process.env.BITCOIN_HOST,
    port: parseInt(process.env.BITCOIN_PORT, 10),
    username: process.env.BITCOIN_USER,
    password: process.env.BITCOIN_PASS
});
exports.default = client;
