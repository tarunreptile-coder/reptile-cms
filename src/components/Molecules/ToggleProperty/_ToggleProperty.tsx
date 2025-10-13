import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text, Toggle } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';

import './_ToggleProperty.scss';

const _ToggleProperty = controlled<
    Reptile.Props.TogglePropertyProps,
    Reptile.Controllers.ITogglePropertyController
>(({ className, style, controller }) => {
    const handleClick = useCallback(
        (_: unknown, active: boolean) => {
            controller.active = active;
        },
        [controller]
    );

    return (
        <div className={clsx('rt-toggle-property', className)} style={style}>
            <Toggle active={() => controller.active} onClick={handleClick} />
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
        </div>
    );
});

export default _ToggleProperty;
