import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_Divider.scss';

const _Divider = reactive<Reptile.Props.DividerProps>(({
    className,
    style,
    type,
}) => {
    return (
        <div
            className={clsx('rt-divider', type ?? 'horizontal', className)}
            style={style}
        />
    );
});

export default _Divider;
