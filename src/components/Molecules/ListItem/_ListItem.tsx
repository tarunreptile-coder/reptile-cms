import React from 'react';
import clsx from 'clsx';
import { Text } from '@Reptile/Components/Atoms';
import { reactiveForwardRef, reactiveValue } from '@Reptile/Framework';

import './_ListItem.scss';

const _ListItem = reactiveForwardRef<
    HTMLLIElement,
    Reptile.Props.ListItemProps
>(
    (
        {
            className,
            style,
            header,
            leftElement,
            rightElement,
            supportingText,
            shortcutText,
            size,
            kind,
        },
        { text, onClick },
        ref
    ) => {
        const textSize = size === 'lg' ? 'medium' : 'small';
        const helperTextSize = size === 'lg' ? 'small' : 'extra-small';

        return (
            <li
                ref={ref}
                className={clsx(
                    'rt-list-item',
                    { header },
                    { clickable: !!onClick },
                    size ?? 'sm',
                    `list-item-${kind ?? 'normal'}`,
                    className
                )}
                style={style}
                onClick={onClick}
            >
                {leftElement}
                <div className='rt-list-item-text'>
                    <Text
                        color='gray'
                        size={textSize}
                        weight={header ? 'medium' : 'regular'}
                    >
                        {() => reactiveValue(text) ?? ''}
                    </Text>
                    {!!supportingText && (
                        <Text
                            color='light-gray'
                            size={textSize}
                            weight='regular'
                        >
                            {supportingText}
                        </Text>
                    )}
                </div>
                {!!shortcutText && (
                    <Text
                        color='light-gray'
                        size={helperTextSize}
                        weight='regular'
                    >
                        {shortcutText}
                    </Text>
                )}
                {rightElement}
            </li>
        );
    }
);

export default _ListItem;
