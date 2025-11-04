import React from 'react';
import clsx from 'clsx';
import { HexColorInput, Text } from '@Reptile/Components/Atoms';
import { reactive, reactiveValue } from '@Reptile/Framework';

import './_LabeledHexColorInput.scss';

const _LabeledHexColorInput = reactive<Reptile.Props.LabeledHexColorInputProps>(
    ({ className, style }, { className: _1, style: _2, label, ...props }) => {
        return (
            <div
                className={clsx('rt-labeled-hex-color-input', className)}
                style={style}
            >
                <Text weight='bold' size='medium' color='dark-gray' inline>
                    {() => reactiveValue(label) ?? 'Hex'}
                </Text>
                <HexColorInput {...props} />
            </div>
        );
    }
);

export default _LabeledHexColorInput;
