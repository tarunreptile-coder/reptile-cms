import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_CircleNumber.scss';

const _CircleNumber = reactive<Reptile.Props.CircleNumberProps>(({
    className,
    style,
    number,
}) => {
    return (
        <div
            className={clsx('rt-circle-number', className)}
            style={style}
        >
            <span>{number ?? 0}</span>
        </div>
    )
});

export default _CircleNumber;
