import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text, Slider } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';

import './_SliderProperty.scss';

const _SliderProperty = controlled<
    Reptile.Props.SliderPropertyProps,
    Reptile.Controllers.ISliderPropertyController
>(({ style, className, controller }) => {
    const handleValueChange = useCallback(
        (newValue: number) => {
            controller.value = newValue;
        },
        [controller]
    );

    return (
        <div className={clsx('rt-size-property', className)} style={style}>
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
            <Slider
                minValue={() => controller.minValue}
                maxValue={() => controller.maxValue}
                value={() => controller.value}
                onSliderPick={handleValueChange}
            />
        </div>
    );
});

export default _SliderProperty;
