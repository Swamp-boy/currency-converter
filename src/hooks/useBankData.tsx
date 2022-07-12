import React, { useEffect } from 'react';
import { getCurrencyAxiosData } from '../requests/fetchCurrencyData';
import { BankData } from '../pages/ConvertPage/types';
import { useLocation } from 'react-router-dom';

const useBankData = (setBankData: (data: BankData) => void) => {
    const location = useLocation();

    useEffect(() => {
        (async () => {
            const data = await getCurrencyAxiosData();

            setBankData(data.data);
        })();
    }, [location.pathname]);
};

export default useBankData;
