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
const bitcoin_core_ts_1 = __importDefault(require("bitcoin-core-ts"));
class BitcoinClient extends bitcoin_core_ts_1.default {
    static getNewAddress() {
        throw new Error('Method not implemented.');
    }
    static sendToAddress(newAddress, amount) {
        throw new Error('Method not implemented.');
    }
    constructor(options) {
        super(options);
    }
    getNewAddress() {
        return __awaiter(this, arguments, void 0, function* (label = '', addressType = 'bech32') {
            return yield this.command('getnewaddress', label, addressType);
        });
    }
}
exports.default = BitcoinClient;
