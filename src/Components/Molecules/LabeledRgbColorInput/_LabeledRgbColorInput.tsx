import React from 'react';
import clsx from 'clsx';
import { RgbColorInput, Text } from '@Reptile/Components/Atoms';
import { reactive, reactiveValue } from '@Reptile/Framework';

import './_LabeledRgbColorInput.scss';

const _LabeledRgbColorInput = reactive<Reptile.Props.LabeledRgbColorInputProps>(
    ({ className, style }, { className: _1, style: _2, label, ...props }) => {
        return (
            <div
                className={clsx('rt-labeled-hex-color-input', className)}
                style={style}
            >
                <Text weight='bold' size='medium' color='dark-gray' inline>
                    {() => reactiveValue(label) ?? 'RGB'}
                </Text>
                <RgbColorInput {...props} />
            </div>
        );
    }
);

export default _LabeledRgbColorInput;
