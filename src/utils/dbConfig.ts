export function getShopConfig(shopId: string) {
    
    return {
        host: 'localhost',
        port: 3306,
        user: 'shopUser',
        password: 'shopPassword',
        database: `shop_${shopId}`
    };
}
