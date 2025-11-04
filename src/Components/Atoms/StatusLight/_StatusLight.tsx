import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_StatusLight.scss';

const _StatusLight = reactive<Reptile.Props.StatusLightProps>(({
    className,
    style,
    size,
    status
}) => {
    return (
        <span
            className={clsx('rt-status-light', status, className)}
            style={{width: size ?? 5, height: size ?? 5, ...style}}
        />
    )
});

export default _StatusLight
