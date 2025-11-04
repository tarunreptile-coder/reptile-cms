import { reactive } from '@Reptile/Framework';
import clsx from 'clsx';
import React, { useCallback } from 'react';

import './_Tab.scss';

const _Tab = reactive<Reptile.Props.TabProps>(({
    label,
    selected,
    disabled,
    style,
    className,
    type,
    bold,
}, {
    onClick,
}) => {
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
            onClick(event, label);
        }
    }, [label, onClick]);

    return (
        <button
            disabled={disabled}
            style={style}
            onClick={handleClick}
            className={clsx(
                'rt-tab',
                type ?? 'default',
                className,
                { selected },
                { bold }
            )}
        >
            {label}
        </button>
    );
});

export default _Tab;
