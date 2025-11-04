import React, { useCallback } from 'react';
import clsx from 'clsx';
import { InputField } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';

const _InputProperty = controlled<
    Reptile.Props.InputPropertyProps,
    Reptile.Controllers.IInputPropertyController
>(({ className, style, controller }) => {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            controller.value = e.target.value;
        },
        [controller]
    );

    return (
        <InputField
            className={className}
            style={style}
            onChange={handleChange}
            placeholder={() => controller.placeholder}
            label={() => controller.label}
            value={() => controller.value}
            type={() => controller.type}
        />
    );
});

export default _InputProperty;
