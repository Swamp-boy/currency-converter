import { BankData, Currency } from './types';

export const getConvertedValue = (
    val: number,
    bankData: BankData,
    currency: Currency,
    convertedCurrency: Currency,
): string => {
    if (currency === 'RUB') {
        return (val / bankData.Valute[convertedCurrency].Value).toFixed(2);
    }

    if (convertedCurrency === 'RUB') {
        return (bankData.Valute[currency].Value * val).toFixed(2);
    }

    return (
        (bankData.Valute[currency].Value / bankData.Valute[convertedCurrency].Value) *
        val
    ).toFixed(2);
};
