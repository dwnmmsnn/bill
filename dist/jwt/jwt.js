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
exports.authJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../utils/db");
const authJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(403);
        return; // explicitly return to prevent further execution
    }
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const shopID = decoded === null || decoded === void 0 ? void 0 : decoded.shopID;
        const Connection = yield (0, db_1.connection)();
        const [rows] = yield Connection.query('SELECT secretKey FROM shops WHERE Id = ?', [shopID]);
        if (rows.length === 0) {
            res.sendStatus(403); // sned forbidden if not found
            return; // explicitly return
        }
        const dbSecretKey = rows[0].secretKey;
        const verifiedUser = jsonwebtoken_1.default.verify(token, dbSecretKey);
        req.user = verifiedUser;
        next();
    }
    catch (error) {
        console.error('Error during authentication:', error);
        res.sendStatus(403);
    }
});
exports.authJWT = authJWT;
