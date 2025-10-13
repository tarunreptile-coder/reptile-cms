import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text, Input } from '@Reptile/Components/Atoms';
import { DropdownInput, ListItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_SizeProperty.scss';

const _SizeProperty = controlled<
    Reptile.Props.SizePropertyProps,
    Reptile.Controllers.ISizePropertyController
>(({ style, className, controller }) => {
    useInitController(controller);

    const handleValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            controller.size = e.target.value;
        },
        [controller]
    );

    const handleMeasureChange = React.useCallback(
        (_: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
            controller.measureIndex = index;
        },
        [controller]
    );

    return (
        <div className={clsx('rt-size-property', className)} style={style}>
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
            <Input
                onChange={handleValueChange}
                value={() => controller.size}
                type='number'
                rightElement={
                    <DropdownInput
                        name='measure-dropdown'
                        label={() => controller.measure}
                        value={() => controller.measure}
                        selectedIndex={() => controller.measureIndex}
                        onChange={handleMeasureChange}
                    >
                        {() =>
                            controller.measures.map((label, idx) => (
                                <ListItem key={idx} text={label} />
                            ))
                        }
                    </DropdownInput>
                }
            />
        </div>
    );
});

export default _SizeProperty;
