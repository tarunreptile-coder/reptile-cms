import React, { useCallback } from 'react';
import clsx from 'clsx';
import { controlled } from '@Reptile/Framework';
import {
    Text,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
} from '@Reptile/Components/Atoms';
import { ToolbarCheckbox } from '@Reptile/Components/Molecules';
import { useInitController } from '@Reptile/Hooks';

import './_AlignmentProperty.scss';

const _AlignmentProperty = controlled<
    Reptile.Props.AlignmentPropertyProps,
    Reptile.Controllers.IAlignmentPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleSelect = useCallback(
        (_: unknown, alignment: 'left' | 'center' | 'right') => {
            controller.alignment = alignment;
        },
        [controller]
    );

    return (
        <div className={clsx('rt-alignment-property', className)} style={style}>
            <Text size='medium' color='light-gray'>
                Alignment
            </Text>
            <div className='rt-alignments-container'>
                <ToolbarCheckbox
                    icon={<AlignLeftIcon />}
                    tooltip='Align text to the left'
                    checked={() => controller.alignment === 'left'}
                    onClick={(event) => handleSelect(event, 'left')}
                />
                <ToolbarCheckbox
                    icon={<AlignCenterIcon />}
                    tooltip='Align text to the center'
                    checked={() => controller.alignment === 'center'}
                    onClick={(event) => handleSelect(event, 'center')}
                />
                <ToolbarCheckbox
                    icon={<AlignRightIcon />}
                    tooltip='Align text to the right'
                    checked={() => controller.alignment === 'right'}
                    onClick={(event) => handleSelect(event, 'right')}
                />
            </div>
        </div>
    );
});

export default _AlignmentProperty;
