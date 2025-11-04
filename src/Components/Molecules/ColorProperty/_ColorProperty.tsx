import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { HSV } from 'color-convert/conversions';
import { controlled } from '@Reptile/Framework';
import { Text } from '@Reptile/Components/Atoms';
import { DropdownColorPicker } from '@Reptile/Components/Molecules';
import { useInitController } from '@Reptile/Hooks';

import './_ColorProperty.scss';

const _ColorProperty = controlled<
    Reptile.Props.ColorPropertyProps,
    Reptile.Controllers.IColorPropertyController
>(({ className, style, controller }) => {
    const [open, setOpen] = useState(false);
    useInitController(controller);

    const handleColorPick = useCallback(
        (newColor: HSV, alpha: number) => {
            controller.alpha = alpha;
            controller.color = newColor;
        },
        [controller]
    );

    const handleColorReset = useCallback(() => {
        controller.alpha = 0;
    }, [controller]);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <div className={clsx('rt-color-property', className)} style={style}>
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
            <DropdownColorPicker
                onOpen={handleOpen}
                onClose={handleClose}
                open={open}
                alpha={() => controller.alpha ?? 0}
                color={() => controller.color}
                onColorPick={handleColorPick}
                onColorReset={handleColorReset}
            />
        </div>
    );
});

export default _ColorProperty;
