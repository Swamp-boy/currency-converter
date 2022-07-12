import React, { useEffect, useState } from 'react';
import { BankData, Currency, ValueCurrencyItem } from '../ConvertPage/types';
import { getCurrencyAxiosData } from '../../requests/fetchCurrencyData';
import CurrencySelect from '../../components/CurrencySelect/CurrencySelect';
import './ListPage.scss';
import useBankData from '../../hooks/useBankData';
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard';
import { currency } from '../../constants/enums';

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

    useBankData(setBankData);

    if (!bankData) {
        return null;
    }

    //TODO: ревлизоывать функционал смены абсолютной веелчины в которой расчитывается курс остальных валют

    const currencyArray = Object.keys(bankData.Valute) as unknown as Currency[];

    return (
        <div className={'list-wrapper'}>
            <div className={'list-title'}>
                <h1>Значение валют в </h1>
                <CurrencySelect
                    id={'currency-to-convert'}
                    items={['RUB']}
                    currentItem={'RUB'}
                    onItemSelect={() => {}}
                />
            </div>

            <div className={'list-cards'}>
                {currencyArray.map((currency: Currency) => {
                    return (
                        <CurrencyCard
                            name={bankData.Valute[currency].Name}
                            value={bankData.Valute[currency].Value}
                            abbreviation={bankData.Valute[currency].CharCode}
                            key={bankData.Valute[currency].ID}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ListPage;
