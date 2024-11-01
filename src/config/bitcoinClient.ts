import Client from 'bitcoin-core-ts';
import ClientOptions from 'bitcoin-core-ts';

class BitcoinClient extends Client {
    static getTransaction: any;
    static getNewAddress() {
        throw new Error('Method not implemented.');
    }
    static sendToAddress(newAddress: any, amount: number) {
        throw new Error('Method not implemented.');
    }
    getTransaction: any;
    constructor(options: ClientOptions) {
        super(options);
    }

    async getNewAddress(label: string = '', addressType: string = 'bech32'): Promise<string> {
        return await this.command('getnewaddress', label, addressType);
    }

}

export default BitcoinClient;