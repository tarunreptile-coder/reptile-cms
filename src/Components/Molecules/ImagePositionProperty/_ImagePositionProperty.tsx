import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { DropdownInput, ListItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_ImagePositionProperty.scss';

const _ImagePositionProperty = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IImagePositionPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleChange = useCallback(
        (
            _: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
        ) => {
            controller.positionIndex = selectedIndex;
        },
        [controller]
    );

    return (
        <div
            className={clsx('rt-font-style-property', className)}
            style={style}
        >
            <Text size='medium' color='light-gray'>
                Image Position
            </Text>
            <DropdownInput
                name='measure-dropdown'
                label={'Select Position'}
                value={() => controller.position}
                selectedIndex={() => controller.positionIndex}
                onChange={handleChange}
            >
                {() =>
                    controller.positions.map((position) => (
                        <ListItem
                            key={position.displayName}
                            text={position.displayName}
                        />
                    ))
                }
            </DropdownInput>
        </div>
    );
});

export default _ImagePositionProperty;
