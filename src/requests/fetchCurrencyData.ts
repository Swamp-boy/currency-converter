import { BankData } from '../pages/ConvertPage/types';

const C_B_LINK = 'https://www.cbr-xml-daily.ru/daily_json.js';
import axios from 'axios';

export const getCurrencyData = async (): Promise<BankData> => {
    const result = await fetch(C_B_LINK);

    return await result.json();
};

export const getCurrencyAxiosData = (): Promise<{ data: BankData }> => {
    return axios.get(C_B_LINK);
};
