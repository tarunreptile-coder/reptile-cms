import React from 'react';
import clsx from 'clsx';
import { Input, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_InputField.scss';

const _InputField = reactive<Reptile.Props.InputFieldProps>(
    (
        { className, style, label, placeholder },
        { className: _1, style: _2, label: _3, ...props }
    ) => {
        
        return (
            <div className={clsx(['rt-input-field', className])} style={style}>
                {label && (
                    <Text
                        className='rt-input-field-label'
                        color='gray'
                        size='small'
                        weight='medium'
                    >
                        {label}
                    </Text>
                )}
                <Input placeholder={placeholder} {...props} />
            </div>
        );
    }
);

export default _InputField;
