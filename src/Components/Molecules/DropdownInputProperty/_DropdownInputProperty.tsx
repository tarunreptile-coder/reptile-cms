import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { DropdownInput, ListItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_DropdownInputProperty.scss';

const _DropdownInputProperty = controlled<
    Reptile.Props.DropdownPropertyProps,
    Reptile.Controllers.IDropdownPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleChange = useCallback(
        (e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemIndex: number) => {
            controller.selectedIndex = itemIndex;
        },
        [controller]
    );

    return (
        <div
            className={clsx('rt-dropdown-input-property', className)}
            style={style}
        >
            <Text size='medium' color='light-gray'>
                {() => controller.label}
            </Text>
            <DropdownInput
                name='measure-dropdown'
                label={() => `Select ${controller.label}`}
                value={() => controller.selectedOption ?? 'None'}
                selectedIndex={() => controller.selectedIndex}
                onChange={handleChange}
            >
                {() =>
                    controller?.options?.map((item) => (
                        <ListItem key={item} text={item} />
                    ))
                }
            </DropdownInput>
        </div>
    );
});

export default _DropdownInputProperty;
