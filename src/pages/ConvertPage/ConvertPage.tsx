import React, { useEffect, useState } from 'react';
import { getCurrencyAxiosData } from '../../requests/fetchCurrencyData';
import './ConvertPage.scss';
import { BankData, Currency } from './types';
import { getConvertedValue } from './utils';
import { Link, useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import CurrencySelect from '../../components/CurrencySelect/CurrencySelect';
import useBankData from '../../hooks/useBankData';

const ConvertPage = () => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [convertedCurrency, setConvertedCurrency] = useState<Currency>('RUB');
    const [currentValue, setCurrentValue] = useState<string>('');
    const [convertedValue, setConvertedValue] = useState<number>(0);
    const [bankData, setBankData] = useState<BankData | null>(null);

    const location = useLocation();

    const convertValue = () => {
        if (isNaN(Number(currentValue)) || Number(currentValue) < 0 || bankData === null) {
            return;
        }

        setConvertedValue(
            Number(getConvertedValue(Number(currentValue), bankData, currency, convertedCurrency)),
        );
    };

    useBankData(setBankData);

    if (!bankData) {
        return null;
    }

    const currencyItems = [...Object.keys(bankData.Valute), 'RUB'].sort() as unknown as Currency[];

    const onInputChange = (val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentValue(val.target.value);
    };

    const onKeyDown = (key: React.KeyboardEvent) => {
        if (key.key === 'Enter') {
            convertValue();
        }
    };

    return (
        <div>
            <div className={'currency-convert-wrapper'}>
                <div className={'currency-convert-container'}>
                    <TextField
                        id="convert-input"
                        variant="outlined"
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                    />

                    <CurrencySelect
                        id={'currency-to-convert'}
                        items={currencyItems}
                        currentItem={currency}
                        onItemSelect={setCurrency}
                    />
                </div>
                <div className={'currency-convert-container'}>
                    <TextField
                        id="converted-input"
                        variant="outlined"
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                        value={convertedValue}
                    />

                    <CurrencySelect
                        id={'converted-currency'}
                        items={currencyItems}
                        currentItem={convertedCurrency}
                        onItemSelect={setConvertedCurrency}
                    />
                </div>
            </div>
            <div className={'currency-buttons'}>
                <Button variant="outlined" onClick={convertValue} size={'large'}>
                    Convert
                </Button>
                <Link to={`${location.pathname}list`} className={'currency-show-btn'}>
                    <Button size={'large'} variant="outlined" onClick={convertValue}>
                        Show all
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ConvertPage;
