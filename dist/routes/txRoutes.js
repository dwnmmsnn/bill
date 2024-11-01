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
const express_1 = require("express");
const txService_1 = require("../services/txService");
const jwt_1 = require("../jwt/jwt");
const dbConfig_1 = require("../utils/dbConfig");
const txRouter = (0, express_1.Router)();
txRouter.post('/process-tx', jwt_1.authJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const txData = req.body;
    const shopConfig = (0, dbConfig_1.getShopDBConfig)(req.user.shopId); // retrieve shops DB config
    try {
        yield (0, txService_1.logTransaction)(shopConfig, txData);
        res.status(200).send('Transaction logged successfully.');
    }
    catch (error) {
        res.status(500).send('Error logging transaction.');
    }
}));
exports.default = txRouter;
