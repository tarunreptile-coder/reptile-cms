import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_List.scss';

const _List = reactive<Reptile.Props.ListProps>(({
    className,
    style,
    children,
}) => {
    return (
        <ul
            className={clsx('rt-list', className)}
            style={style}
        >
            {children}
        </ul>
    )
});

export default _List;
