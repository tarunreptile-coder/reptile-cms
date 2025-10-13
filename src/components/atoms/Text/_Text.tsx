import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { truncate } from 'lodash';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_Text.scss';

const _Text = reactive<Reptile.Props.TextProps>(({
    className,
    style,
    children,
    color,
    inline,
    maxLength,
    size,
    weight,
}) => {
    return (
        <div
            className={clsx(
                'rt-text',
                { inline: inline },
                weight ?? 'regular',
                `font-size-${size ?? 'primary'}`,
                `${color ?? 'primary'}-color`,
                className
            )}
            style={style}
        >
            {maxLength ? truncate(children, { length: maxLength, omission: '...' }) : children ?? <Skeleton width='100%' />}
        </div>
    );
});

export default _Text;
