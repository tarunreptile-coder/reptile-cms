import React from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_TextArea.scss';

const _TextArea = reactive<Reptile.Props.TextAreaProps>(
    (
        {
            className,
            style,
            defaultValue,
            label,
            name,
            placeholder,
            value,
            disabled,
        },
        { onChange }
    ) => {
        return (
            <div className={clsx('rt-text-area', className)} style={style}>
                {label && (
                    <Text
                        className='rt-text-area-label'
                        color='gray'
                        size='small'
                        weight='medium'
                    >
                        {label}
                    </Text>
                )}
                <textarea
                    defaultValue={defaultValue}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    rows={2}
                    disabled={disabled}
                />
            </div>
        );
    }
);

export default _TextArea;
