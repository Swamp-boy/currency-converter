import React from 'react';
import { Currency } from '../../pages/ConvertPage/types';
import { MenuItem, Select } from '@mui/material';

type TCurrencySelect = {
    id: string;
    currentItem: Currency;
    items: Currency[];
    onItemSelect: (item: Currency) => void;
};

const CurrencySelect: React.FC<TCurrencySelect> = (props) => {
    const { id, currentItem, items, onItemSelect } = props;

    return (
        <Select labelId={id} id={id} value={currentItem}>
            {items.map((item, index) => (
                <MenuItem value={item} key={item + index} onClick={() => onItemSelect(item)}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CurrencySelect;
