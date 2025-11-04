import React, { useCallback } from 'react';
import clsx from 'clsx';
import { controlled } from '@Reptile/Framework';
import { Text, Checkbox } from '@Reptile/Components/Atoms';
import { useInitController } from '@Reptile/Hooks';

import './_CheckboxProperty.scss';

const _CheckboxProperty = controlled<
    Reptile.Props.CheckboxPropertyProps,
    Reptile.Controllers.ICheckboxPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleClick = useCallback(
        (_: unknown, active: boolean) => {
            controller.active = active;
        },
        [controller]
    );

    return (
        <div className={clsx('rt-checkbox-property', className)} style={style}>
            <Checkbox active={() => controller.active} onClick={handleClick} />
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
        </div>
    );
});

export default _CheckboxProperty;
