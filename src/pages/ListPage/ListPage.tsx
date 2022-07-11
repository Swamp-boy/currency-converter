import React, { useEffect, useState } from 'react';
import { BankData, Currency } from '../ConvertPage/types';
import { getCurrencyAxiosData } from '../../requests/fetchCurrencyData';
import { withRouter } from 'react-router-dom';

type TListItem = {
    currency: string;
    value: number;
};

const ListItem: React.FC<TListItem> = (props) => {
    const { currency, value } = props;

    return (
        <div className={'list-item'}>
            <div className={'list-item__currency'}>{currency}</div>
            <div className={'list-item__value'}>{value}</div>
        </div>
    );
};

const ListPage = () => {
    const [bankData, setBankData] = useState<BankData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getCurrencyAxiosData().then((data) => {
            setBankData(data.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <div className={'list-wrapper'}>
            <div className={'list-container'}>
                {Object.keys(bankData!.Valute).map((key) => (
                    <ListItem
                        currency={key}
                        value={bankData!.Valute[key as unknown as Currency].Value}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListPage;
