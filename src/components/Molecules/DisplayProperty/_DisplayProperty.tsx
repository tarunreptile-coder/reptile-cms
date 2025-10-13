import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { DropdownInput, ListItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_DisplayProperty.scss';

const _DisplayProperty = controlled<
    Reptile.Props.FontFamilyPropertyProps,
    Reptile.Controllers.IThemesDisplayController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleChange = useCallback(
        (
            _: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
        ) => {
            controller.displayIndex = selectedIndex;
        },
        [controller]
    );

    return (
        <div
            className={clsx('rt-display-style-property', className)}
            style={style}
        >
            <Text size='medium' color='light-gray'>
                Display
            </Text>
            <DropdownInput
                name='measure-dropdown'
                label={'Select Display'}
                value={() => controller.display}
                selectedIndex={() => controller.displayIndex}
                onChange={handleChange}
            >
                {() =>
                    controller.displays.map((displayName) => (
                        <ListItem key={displayName} text={displayName} />
                    ))
                }
            </DropdownInput>
        </div>
    );
});

export default _DisplayProperty;
