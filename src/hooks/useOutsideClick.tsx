import React, { useEffect } from 'react';

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

export default useOutsideClick;
