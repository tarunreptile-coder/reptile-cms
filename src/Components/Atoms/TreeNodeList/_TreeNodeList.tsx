import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_TreeNodeList.scss';

const _TreeNodeList = reactive<Reptile.Props.TreeNodeListProps>(({
    children,
    className,
    style,
}) => {
    return (
        <div
            className={clsx('rt-tree-node-list', className)}
            style={style}
        >
            {children}
        </div>
    )
});

export default _TreeNodeList;
