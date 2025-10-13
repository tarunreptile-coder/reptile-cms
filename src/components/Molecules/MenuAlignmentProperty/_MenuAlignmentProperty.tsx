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

import './_MenuAlignmentProperty.scss';

const _MenuAlignmentProperty = controlled<
    Reptile.Props.AlignmentPropertyProps,
    Reptile.Controllers.IAlignmentPropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleSelect = useCallback(
        (_: unknown, alignment: 'row' | 'row-reverse') => {
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
                    checked={() => controller.alignment === 'row-reverse'}
                    onClick={(event) => handleSelect(event, 'row-reverse')}
                />
                <ToolbarCheckbox
                    icon={<AlignRightIcon />}
                    tooltip='Align text to the right'
                    checked={() => controller.alignment === 'row'}
                    onClick={(event) => handleSelect(event, 'row')}
                />
            </div>
        </div>
    );
});

export default _MenuAlignmentProperty;
