import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './Select.scss';
import { Currency } from '../../pages/ConvertPage/types';

type TSelect = {
    items: Currency[];
    current: string;
    onChange: (item: Currency) => void;
};

function useOutsideClick(ref: React.RefObject<HTMLDivElement>, hide: (val: boolean) => void) {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            event.stopPropagation();

            if (ref.current && !ref.current.contains(event.target as any)) {
                hide(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

const Select: React.FC<TSelect> = (props) => {
    const { current, items, onChange } = props;
    const [isHide, setIsHide] = useState<boolean>(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useOutsideClick(containerRef, setIsHide);

    return (
        <div
            className={cn('select__container', { 'select__container--full': isHide })}
            ref={containerRef}
        >
            <div className={'select__current'} onClick={() => setIsHide(!isHide)}>
                <div className={'select__current-name'}>{current}</div>
                <div
                    className={cn('select__current-arrow', { 'select__current-arrow--up': isHide })}
                />
            </div>

            <ul className={cn('select__options', { 'select__options--hide': isHide })}>
                {items.map((item, index) => {
                    return (
                        <li
                            className="select__option"
                            data-select="option"
                            data-value={item}
                            data-index={index}
                            onClick={() => {
                                setIsHide(true);
                                onChange(item);
                            }}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Select;
