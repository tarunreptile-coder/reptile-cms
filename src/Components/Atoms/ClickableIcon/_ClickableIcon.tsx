import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_ClickableIcon.scss'

const _ClickableIcon = reactive<Reptile.Props.ClickableIconProps>(({
    style,
    className,
    icon,
    disabled,
}, {
    onClick,
}) => {
    return (
        <div
            className={clsx('rt-clickable-icon', { disabled }, className)}
            style={style}
            onClick={disabled ? undefined : onClick}
        >
            {icon}
        </div>
    )
});

export default _ClickableIcon;
