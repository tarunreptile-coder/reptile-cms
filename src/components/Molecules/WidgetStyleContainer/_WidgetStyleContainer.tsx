import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_WidgetStyleContainer.scss';

const _WidgetStyleContainer = reactive<Reptile.Props.WidgetStyleContainerProps>(({
    className,
    style,
    children,
}: Reptile.Props.WidgetStyleContainerProps) => {
    return (
        <div className={clsx('rt-widget-style-container', className)} style={style}>
            {children}
        </div>
    )
});

export default _WidgetStyleContainer;
