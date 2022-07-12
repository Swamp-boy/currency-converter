import React from 'react';
import './CurrencyCard.scss';
import { Card, CardContent, Typography } from '@mui/material';
import { Currency } from '../../pages/ConvertPage/types';

type TCurrencyCard = {
    name: string;
    abbreviation: Currency;
    value: number;
};

const CurrencyCard: React.FC<TCurrencyCard> = (props) => {
    const { name, value, abbreviation } = props;

    return (
        <Card className={'card'}>
            <CardContent className={'card-content'}>
                <Typography className={'card-name'}>{name}</Typography>

                <div className={'card-value'}>
                    <Typography className={'card-value'}>{abbreviation}</Typography>
                    <Typography className={'card-value'}>{value}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default CurrencyCard;
