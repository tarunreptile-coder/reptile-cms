import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { DropdownInput, ListItem } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_FontFamilyProperty.scss';

const _FontFamilyProperty = controlled<
    Reptile.Props.FontFamilyPropertyProps,
    Reptile.Controllers.IFontFamilyPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleChange = useCallback(
        (
            _: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
        ) => {
            controller.currentProperty = 'font-family';
            controller.fontIndex = selectedIndex;
        },
        [controller]
    );

    return (
        <div
            className={clsx('rt-font-style-property', className)}
            style={style}
        >
            <Text size='medium' color='light-gray'>
                Font family
            </Text>
            <DropdownInput
                name='measure-dropdown'
                label={'Select Font'}
                value={() => controller.font}
                selectedIndex={() => controller.fontIndex}
                onChange={handleChange}
            >
                {() =>
                    controller.fonts.map((font) => (
                        <ListItem
                            key={font.displayName}
                            text={font.displayName}
                        />
                    ))
                }
            </DropdownInput>
        </div>
    );
});

export default _FontFamilyProperty;
