import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_FeaturedIcon.scss';

const _FeaturedIcon = reactive<Reptile.Props.FeaturedIconProps>(({
    className,
    style,
    icon,
    color,
    size,
    type,
}) => {
    return (
        <div className={clsx(
            'rt-featured-icon',
            `rt-featured-icon-${size ?? 'sm'}`,
            `rt-featured-icon-${type ?? 'light-circle'}`,
            `rt-featured-icon-${color ?? 'primary'}`,
            className
        )} style={style}>
            {icon}
        </div>
    )
});

export default _FeaturedIcon;
