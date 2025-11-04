import React, { useCallback } from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_Toggle.scss';

const POSITION_DELTA = 2;

const _Toggle = reactive<Reptile.Props.ToggleProps>(({
    active,
    className,
    style,
    size,
}, {
    onClick,
}) => {
    const THUMB_RADIUS = size === 'md' ? 10 : 8;

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            onClick(e, !active);
        }
    }, [onClick, active]);

    return (
        <div
            className={clsx(
                'rt-toggle',
                `rt-toggle-${size ?? 'md'}`,
                {['active']: active},
                className
            )}
            style={style}
            onClick={handleClick}
        >
            <div
                className={clsx(
                    'rt-picker-thumb',
                    `rt-picker-thumb-${size ?? 'md'}`,
                )}
                style={{
                    left: active ? `${2.5 * THUMB_RADIUS + POSITION_DELTA}px` : `${POSITION_DELTA}px`,
                    top: `${POSITION_DELTA}px`,
                }}
            />
        </div>
    );
});

export default _Toggle;
