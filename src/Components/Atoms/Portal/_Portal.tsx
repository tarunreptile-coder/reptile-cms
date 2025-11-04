import React from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import { reactive } from '@Reptile/Framework';

import './_Portal.scss';

const _Portal = reactive<Reptile.Props.PortalProps>(({
    className,
    style,
    children,
    active,
}) => {
    if (active) {
        return ReactDOM.createPortal((
            <div className={clsx('rt-portal', className)} style={style}>
                {children}
            </div>
        ), document.body);
    }

    return <></>;
});

export default _Portal;
