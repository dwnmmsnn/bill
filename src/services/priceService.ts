import axios from 'axios';

export const getBtcPrice = async (): Promise<number> => {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    return response.data.bpi.USD.rate_float;
};
