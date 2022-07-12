export type Currency =
    | 'AUD'
    | 'AZN'
    | 'GBP'
    | 'AMD'
    | 'BYN'
    | 'BGN'
    | 'BRL'
    | 'HUF'
    | 'HKD'
    | 'DKK'
    | 'USD'
    | 'EUR'
    | 'INR'
    | 'KZT'
    | 'CAD'
    | 'KGS'
    | 'CNY'
    | 'MDL'
    | 'NOK'
    | 'PLN'
    | 'RON'
    | 'XDR'
    | 'SGD'
    | 'TJS'
    | 'TRY'
    | 'TMT'
    | 'UZS'
    | 'UAH'
    | 'CZK'
    | 'SEK'
    | 'CHF'
    | 'ZAR'
    | 'KRW'
    | 'JPY'
    | 'RUB';

export type ValueCurrencyItem = {
    ID: string;
    NumCode: string;
    CharCode: Currency;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
};

export type BankData = {
    Date: Date;
    PreviousDate: Date;
    PreviousURL: string;
    Timestamp: Date;
    Valute: { [key in Currency]: ValueCurrencyItem };
};
