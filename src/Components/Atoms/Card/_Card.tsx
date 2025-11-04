import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_Card.scss';

const _Card = reactive<Reptile.Props.CardProps>(({
    className,
    style,
    selected,
    children,
}, {
    onClick,
}) => {
    return (
        <div onClick={onClick} className={clsx('rt-card', { selected, clickable: !!onClick }, className)} style={style}>
            {children}
        </div>
    );
});

export default _Card;
