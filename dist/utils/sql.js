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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretKey = getSecretKey;
const db_1 = require("../utils/db");
function getSecretKey(shopId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, db_1.connection)();
            const [rows] = yield conn.query('SELECT secretKey FROM Id WHERE Id = ?', [shopId]);
            if (rows.length > 0) {
                return rows[0].secretKey;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching secret key:', error);
            return null;
        }
    });
}
