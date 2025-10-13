import React, { useEffect } from 'react';

type UseOutsideClickOverload = {
    (ref: React.RefObject<Element>, onClickOutside: () => void): void,
    (refs: React.RefObject<Element>[], onClickOutside: () => void): void,
}

const _useOutsideClick: UseOutsideClickOverload = (ref, onClickOutside) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            let refs: React.RefObject<Element>[];
            if (Array.isArray(ref)) {
                refs = ref;
            } else {
                refs = [ref];
            }
            if (refs.every((element) => element.current && !element.current.contains(event.target as Node))) {
                if (onClickOutside) {
                    onClickOutside();
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClickOutside]);

    return [];
}

export default _useOutsideClick;
