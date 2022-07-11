import React, { useEffect, useState } from 'react';
import { getCurrencyAxiosData } from '../../requests/fetchCurrencyData';
import './ConvertPage.scss';
import Select from '../../components/Select/Select';
import { BankData, Currency } from './types';
import { getConvertedValue } from './utils';
import cn from 'classnames';
import { Link, useLocation, withRouter } from 'react-router-dom';

const ConvertPage = () => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [convertedCurrency, setConvertedCurrency] = useState<Currency>('RUB');
    const [currentValue, setCurrentValue] = useState<string>('');
    const [convertedValue, setConvertedValue] = useState<number>(0);
    const [bankData, setBankData] = useState<BankData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const location = useLocation();

    const convertValue = () => {
        if (isNaN(Number(currentValue)) || Number(currentValue) < 0 || bankData === null) {
            console.log('incorrect string');

            return;
        }
        setConvertedValue(
            Number(getConvertedValue(Number(currentValue), bankData, currency, convertedCurrency)),
        );

        console.log(convertedCurrency);
    };

    useEffect(() => {
        getCurrencyAxiosData().then((data) => {
            setBankData(data.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return null;
    }

    const currencyItems = [...Object.keys(bankData!.Valute), 'RUB'] as unknown as Currency[];

    return (
        <div>
            <div className={'currency-convert-wrapper'}>
                <div className={'currency-convert-container'}>
                    <input
                        className={'currency-input'}
                        type={'text'}
                        onChange={(val) => setCurrentValue(val.target.value)}
                    />
                    <Select
                        items={currencyItems}
                        current={currency}
                        onChange={(item) => setCurrency(item)}
                    />
                </div>
                <div className={'currency-convert-container'}>
                    <input className={'currency-input'} type={'text'} value={convertedValue} />
                    <Select
                        items={currencyItems}
                        current={convertedCurrency}
                        onChange={(item: Currency) => setConvertedCurrency(item)}
                    />
                </div>
            </div>

            <div className={cn('button', 'currency-convert-btn')} onClick={convertValue}>
                Convert
            </div>

            <Link to={`${location.pathname}list`}>
                <div className={cn('button', 'currency-show-btn')} onClick={convertValue}>
                    Show all
                </div>
            </Link>
        </div>
    );
};

export default ConvertPage;
