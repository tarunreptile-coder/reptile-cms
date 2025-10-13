import React from 'react';
import clsx from 'clsx';
import { reactiveForwardRef } from '@Reptile/Framework';

import './_Button.scss';

const _Button = reactiveForwardRef<HTMLButtonElement, Reptile.Props.ButtonProps>(({
    icon,
    iconPosition,
    children,
    className,
    style,
    color,
    size,
    disabled,
    variant,
}, {
    onClick,
    onMouseEnter,
    onMouseLeave,
}, ref) => {
    return (
        <button
            ref={ref}
            className={clsx(
                'rt-btn',
                `rt-btn-${color ?? 'gray'}`,
                `rt-btn-${size ?? 'md'}`,
                `rt-btn-${variant ?? 'outlined'}`,
                { icon: icon && !children },
                className,
            )}
            style={style}
            disabled={disabled}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <>
                {iconPosition !== 'right' && icon}
                {!!children && <span>{children}</span>}
                {iconPosition === 'right' && icon}
            </>
        </button >
    )
});

export default _Button;
