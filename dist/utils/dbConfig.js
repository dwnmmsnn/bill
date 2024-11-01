"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopDBConfig = getShopDBConfig;
function getShopDBConfig(shopId) {
    return {
        host: 'localhost',
        port: 3306,
        user: 'shopUser',
        password: 'shopPassword',
        database: `shop_${shopId}`
    };
}
