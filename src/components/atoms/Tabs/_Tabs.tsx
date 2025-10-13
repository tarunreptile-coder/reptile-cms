import React, { useMemo } from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_Tabs.scss';

const _Tabs = reactive<Reptile.Props.TabsProps>(({
    children,
    className,
    style,
    selectedTabIndex,
    type,
}, {
    onSelect,
}) => {
    const tabs = useMemo(() => React.Children.toArray(children).map(
        (child, idx) => React.cloneElement(child as React.ReactElement, {
            selected: idx === selectedTabIndex,
            onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (onSelect) {
                    onSelect(event, idx);
                }
            },
            type,
        }),
    ),
        [onSelect, selectedTabIndex, children, type]
    );

    return (
        <div
            style={style}
            className={clsx(
                'rt-tabs',
                type ?? 'default',
                className
            )}
        >
            {tabs}
        </div>
    );
});

export default _Tabs;
