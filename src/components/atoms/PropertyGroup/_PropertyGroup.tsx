import React from 'react';
import clsx from 'clsx';
import { Collapse, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import * as Icons from '@Reptile/Components/Atoms/Icons/_Icons';

import './_PropertyGroup.scss';

const _PropertyGroup = reactive<Reptile.Props.PropertyGroupProps>(
    (
        { children, style, className, idx, label, isActive, currentIdx },
        { onIndexClick }
    ) => {
        return (
            <div
                className={clsx(
                    `rt-property-group ${isActive ? '' : 'close'}`,
                    className
                )}
                style={style}
            >
                <div
                    className={`rt-property-group-header`}
                    onClick={() => {
                        if (idx === currentIdx) {
                            onIndexClick();
                        }
                        if (idx !== currentIdx) {
                            onIndexClick(idx);
                        }
                    }}
                >
                    <Text size='large' color='black' weight='semibold'>
                        {label}
                    </Text>
                    <Icons.ChevronRightIcon
                        className={`property-group-arrow ${
                            isActive ? 'open' : ''
                        }`}
                    />
                </div>
                <Collapse
                    in={isActive}
                    className={clsx('rt-property-group-list')}
                    unmountOnExit
                >
                    {children}
                </Collapse>
            </div>
        );
    }
);

export default _PropertyGroup;
