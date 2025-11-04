import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';
import { Text } from '@Reptile/Components/Atoms';

import './_Tag.scss';

const _Tag = reactive<Reptile.Props.TagProps>(
    ({ className, style, label, tagColor, color, size, type }) => {
        return (
            <div
                className={clsx(
                    'rt-tag',
                    `rt-tag-${type ?? 'light-circle'}`,
                    `rt-tag-${tagColor ?? 'primary'}`,
                    className
                )}
                style={style}
            >
                <Text color={color} size={size}>
                    {label}
                </Text>
            </div>
        );
    }
);

export default _Tag;
