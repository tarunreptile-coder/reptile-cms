import React, { useCallback } from 'react';
import clsx from 'clsx';
import {
    Text,
    BoldIcon,
    UnderlineIcon,
    ItalicIcon,
} from '@Reptile/Components/Atoms';
import { ToolbarCheckbox } from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_FontStyleProperty.scss';

const _FontStyleProperty = controlled<
    Reptile.Props.FontStylePropertyProps,
    Reptile.Controllers.IFontStylePropertyController
>(({ className, style, controller }) => {
    useInitController(controller);

    const handleBoldClick = useCallback(
        (
            _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            active: boolean
        ) => {
            controller.currentProperty = 'font-weight';
            active == true
                ? (controller.fontWeight = 'bold')
                : (controller.fontWeight = 'unset');
            controller.bold = active;
        },
        [controller]
    );

    const handleItalicClick = useCallback(
        (
            _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            active: boolean
        ) => {
            controller.currentProperty = 'font-style';
            active == true
                ? (controller.fontStyle = 'italic')
                : (controller.fontStyle = 'unset');
            controller.italic = active;
        },
        [controller]
    );

    const handleUnderlineClick = useCallback(
        (
            _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            active: boolean
        ) => {
            controller.currentProperty = 'text-decoration';
            active == true
                ? (controller.textDecoration = 'underline')
                : (controller.textDecoration = 'none');
            controller.underline = active;
        },
        [controller]
    );

    return (
        <div
            className={clsx('rt-font-style-property', className)}
            style={style}
        >
            <Text size='medium' color='light-gray'>
                Font style
            </Text>
            <div className='rt-font-styles'>
                <ToolbarCheckbox
                    icon={<BoldIcon />}
                    checked={() => controller.bold}
                    onClick={handleBoldClick}
                    tooltip='Bold'
                />
                <ToolbarCheckbox
                    icon={<ItalicIcon />}
                    checked={() => controller.italic}
                    onClick={handleItalicClick}
                    tooltip='Italic'
                />
                <ToolbarCheckbox
                    icon={<UnderlineIcon />}
                    checked={() => controller.underline}
                    onClick={handleUnderlineClick}
                    tooltip='Underline'
                />
            </div>
        </div>
    );
});

export default _FontStyleProperty;
