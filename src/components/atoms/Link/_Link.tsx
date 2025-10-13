import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_Link.scss';

const _Link = reactive<Reptile.Props.LinkProps>(({
    style,
    className,
    title,
    color,
    border,
    fontWeight,
}, {
    onClick,
}) => {
    return (
        <a
            className={clsx(
                'rt-link',
                `rt-link-${fontWeight ?? '500'}`,
                `rt-link-${border ?? 'default'}`,
                `rt-link-color-${color ?? 'primary'}`,
                className
            )}
            style={style}
            onClick={onClick}
        >
            <span>{title}</span>
        </a>
    )
});

export default _Link;
